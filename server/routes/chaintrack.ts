import { Router } from "express";
import { storage } from "../storage";
import { 
  insertChaintrackSellerSchema, 
  insertChaintrackEscrowSchema,
  insertChaintrackShipmentSchema,
  insertChaintrackDocumentSchema,
  insertChaintrackAmlLogSchema,
  insertChaintrackComplianceAlertSchema,
  insertChaintrackAuditLogSchema,
  insertChaintrackInventorySchema,
  insertChaintrackBidSchema
} from "@shared/schema";
import { randomUUID } from "crypto";

const router = Router();

router.get("/sellers", async (req, res) => {
  try {
    const sellers = await storage.getAllChaintrackSellers();
    res.json(sellers);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
});

router.get("/sellers/:id", async (req, res) => {
  try {
    const seller = await storage.getChaintrackSeller(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(seller);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch seller" });
  }
});

router.post("/sellers", async (req, res) => {
  try {
    const validatedData = insertChaintrackSellerSchema.parse(req.body);
    
    const seller = await storage.createChaintrackSeller(validatedData);
    
    await storage.createChaintrackAmlLog({
      sellerId: seller.id,
      eventType: "kyc_check",
      riskLevel: "low",
      screeningProvider: "OFAC",
      screeningResult: "pending",
      status: "pending"
    });
    
    res.json(seller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid seller data" });
  }
});

router.patch("/sellers/:id", async (req, res) => {
  try {
    const updates = req.body;
    const seller = await storage.updateChaintrackSeller(req.params.id, updates);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(seller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update seller" });
  }
});

router.post("/sellers/:id/verify", async (req, res) => {
  try {
    const seller = await storage.updateChaintrackSeller(req.params.id, {
      kycStatus: "verified",
      verificationStatus: "verified",
      verifiedAt: new Date(),
      sanctionsScreeningStatus: "clear",
      sanctionsScreeningDate: new Date()
    });
    
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    
    res.json(seller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to verify seller" });
  }
});

router.get("/escrows", async (req, res) => {
  try {
    const { sellerId, buyerId } = req.query;
    const escrows = await storage.getAllChaintrackEscrows(
      sellerId as string | undefined,
      buyerId as string | undefined
    );
    res.json(escrows);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch escrows" });
  }
});

router.get("/escrows/:id", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.id);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    res.json(escrow);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch escrow" });
  }
});

router.post("/escrows", async (req, res) => {
  try {
    const validatedData = insertChaintrackEscrowSchema.parse(req.body);
    
    const escrowNumber = `ESCROW/DEL/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    
    const escrowData = {
      ...validatedData,
      escrowNumber,
      status: "pending" as const
    };
    
    const escrow = await storage.createChaintrackEscrow(escrowData);
    
    await storage.createChaintrackAuditLog({
      action: "escrow_created",
      resourceType: "escrow",
      resourceId: escrow.id,
      changes: { status: "pending", escrowNumber },
      currentLogHash: randomUUID()
    });
    
    res.json(escrow);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid escrow data" });
  }
});

router.patch("/escrows/:id", async (req, res) => {
  try {
    const updates = req.body;
    const escrow = await storage.updateChaintrackEscrow(req.params.id, updates);
    
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    await storage.createChaintrackAuditLog({
      action: "escrow_updated",
      resourceType: "escrow",
      resourceId: escrow.id,
      changes: updates,
      currentLogHash: randomUUID()
    });
    
    res.json(escrow);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update escrow" });
  }
});

router.post("/escrows/:id/release-partial", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.id);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    const partialAmount = Math.floor(escrow.netToSeller * (escrow.partialReleasePercent || 70) / 100);
    
    const updated = await storage.updateChaintrackEscrow(req.params.id, {
      status: "partial_released",
      partialReleasedAmount: partialAmount,
      partialReleasedAt: new Date(),
      partialReleaseSwiftRef: req.body.swiftRef || `MT103-${Date.now()}`
    });
    
    await storage.createChaintrackAuditLog({
      action: "escrow_partial_release",
      resourceType: "escrow",
      resourceId: req.params.id,
      changes: { partialReleasedAmount: partialAmount },
      currentLogHash: randomUUID()
    });
    
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to release partial payment" });
  }
});

router.post("/escrows/:id/release-full", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.id);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    const remainingAmount = escrow.netToSeller - (escrow.partialReleasedAmount || 0);
    
    const updated = await storage.updateChaintrackEscrow(req.params.id, {
      status: "fully_released",
      fullReleasedAmount: remainingAmount,
      fullReleasedAt: new Date(),
      fullReleaseSwiftRef: req.body.swiftRef || `MT103-${Date.now()}`
    });
    
    await storage.createChaintrackAuditLog({
      action: "escrow_full_release",
      resourceType: "escrow",
      resourceId: req.params.id,
      changes: { fullReleasedAmount: remainingAmount },
      currentLogHash: randomUUID()
    });
    
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to release full payment" });
  }
});

router.get("/shipments", async (req, res) => {
  try {
    const { escrowId } = req.query;
    const shipments = await storage.getAllChaintrackShipments(escrowId as string | undefined);
    res.json(shipments);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});

router.get("/shipments/:id", async (req, res) => {
  try {
    const shipment = await storage.getChaintrackShipment(req.params.id);
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.json(shipment);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch shipment" });
  }
});

router.post("/shipments", async (req, res) => {
  try {
    const validatedData = insertChaintrackShipmentSchema.parse(req.body);
    const shipment = await storage.createChaintrackShipment(validatedData);
    
    await storage.createChaintrackAuditLog({
      action: "shipment_created",
      resourceType: "shipment",
      resourceId: shipment.id,
      changes: { status: shipment.status },
      currentLogHash: randomUUID()
    });
    
    res.json(shipment);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid shipment data" });
  }
});

router.patch("/shipments/:id", async (req, res) => {
  try {
    const updates = req.body;
    const shipment = await storage.updateChaintrackShipment(req.params.id, updates);
    
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    
    await storage.createChaintrackAuditLog({
      action: "shipment_updated",
      resourceType: "shipment",
      resourceId: shipment.id,
      changes: updates,
      currentLogHash: randomUUID()
    });
    
    res.json(shipment);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update shipment" });
  }
});

router.get("/documents", async (req, res) => {
  try {
    const { sellerId, escrowId, shipmentId } = req.query;
    const documents = await storage.getAllChaintrackDocuments(
      sellerId as string | undefined,
      escrowId as string | undefined,
      shipmentId as string | undefined
    );
    res.json(documents);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

router.post("/documents", async (req, res) => {
  try {
    const validatedData = insertChaintrackDocumentSchema.parse(req.body);
    const document = await storage.createChaintrackDocument(validatedData);
    
    await storage.createChaintrackAuditLog({
      action: "document_uploaded",
      resourceType: "document",
      resourceId: document.id,
      changes: { documentType: document.documentType },
      currentLogHash: randomUUID()
    });
    
    res.json(document);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid document data" });
  }
});

router.post("/documents/:id/verify", async (req, res) => {
  try {
    const document = await storage.updateChaintrackDocument(req.params.id, {
      verificationStatus: "verified",
      verifiedAt: new Date(),
      verifiedBy: req.body.verifiedBy
    });
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to verify document" });
  }
});

router.get("/aml-logs", async (req, res) => {
  try {
    const { sellerId, escrowId } = req.query;
    const logs = await storage.getAllChaintrackAmlLogs(
      sellerId as string | undefined,
      escrowId as string | undefined
    );
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch AML logs" });
  }
});

router.post("/aml-logs", async (req, res) => {
  try {
    const validatedData = insertChaintrackAmlLogSchema.parse(req.body);
    const log = await storage.createChaintrackAmlLog(validatedData);
    res.json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid AML log data" });
  }
});

router.get("/compliance-alerts", async (req, res) => {
  try {
    const { sellerId, escrowId, status } = req.query;
    const alerts = await storage.getAllChaintrackComplianceAlerts(
      sellerId as string | undefined,
      escrowId as string | undefined,
      status as string | undefined
    );
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch compliance alerts" });
  }
});

router.post("/compliance-alerts", async (req, res) => {
  try {
    const validatedData = insertChaintrackComplianceAlertSchema.parse(req.body);
    const alert = await storage.createChaintrackComplianceAlert(validatedData);
    res.json(alert);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid compliance alert data" });
  }
});

router.patch("/compliance-alerts/:id/resolve", async (req, res) => {
  try {
    const alert = await storage.updateChaintrackComplianceAlert(req.params.id, {
      status: "resolved",
      resolvedAt: new Date(),
      acknowledgedBy: req.body.resolvedBy,
      resolutionNotes: req.body.resolutionNotes
    });
    if (!alert) {
      return res.status(404).json({ error: "Alert not found" });
    }
    res.json(alert);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to resolve alert" });
  }
});

router.get("/audit-logs", async (req, res) => {
  try {
    const logs = await storage.getAllChaintrackAuditLogs();
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

router.post("/calculate-fees", async (req, res) => {
  try {
    const { fobValue, sellerTier, hasSubscription, services } = req.body;
    
    if (!fobValue || fobValue < 0) {
      return res.status(400).json({ error: "Invalid FOB value" });
    }
    
    let commissionRate = 250;
    if (sellerTier === "verified") {
      commissionRate = 150;
    } else if (sellerTier === "premium") {
      commissionRate = 100;
    }
    
    if (hasSubscription) {
      commissionRate = Math.max(0, commissionRate - 25);
    }
    
    const commissionFee = Math.floor(fobValue * commissionRate / 10000);
    const escrowFixedFee = 10000;
    const escrowPercentFee = Math.floor(fobValue * 25 / 10000);
    const fxFee = Math.floor(fobValue * 20 / 10000);
    
    let customsBrokerageFee = 0;
    let fastReleaseFee = 0;
    
    if (services?.customsBrokerage) {
      customsBrokerageFee = 20000;
    }
    
    if (services?.fastRelease) {
      fastReleaseFee = Math.floor(fobValue * 200 / 10000);
    }
    
    const totalFees = commissionFee + escrowFixedFee + escrowPercentFee + fxFee + customsBrokerageFee + fastReleaseFee;
    const netToSeller = fobValue - totalFees;
    
    res.json({
      fobValue,
      commissionRate,
      commissionFee,
      escrowFixedFee,
      escrowPercentFee,
      fxFee,
      customsBrokerageFee,
      fastReleaseFee,
      totalFees,
      netToSeller,
      breakdown: {
        "Transaction Commission": `${(commissionRate / 100).toFixed(2)}% - $${(commissionFee / 100).toFixed(2)}`,
        "Escrow Fixed Fee": `$${(escrowFixedFee / 100).toFixed(2)}`,
        "Escrow Variable Fee": `0.25% - $${(escrowPercentFee / 100).toFixed(2)}`,
        "FX Processing Fee": `0.20% - $${(fxFee / 100).toFixed(2)}`,
        ...(customsBrokerageFee > 0 && { "Customs Brokerage": `$${(customsBrokerageFee / 100).toFixed(2)}` }),
        ...(fastReleaseFee > 0 && { "Fast Release Fee": `2.00% - $${(fastReleaseFee / 100).toFixed(2)}` })
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to calculate fees" });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const { supplierId, status } = req.query;
    const inventory = await storage.getChaintrackInventory({
      supplierId: supplierId as string | undefined,
      status: status as string | undefined
    });
    res.json(inventory);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

router.post("/inventory", async (req, res) => {
  try {
    const validatedData = insertChaintrackInventorySchema.parse(req.body);
    const item = await storage.createChaintrackInventoryItem(validatedData);
    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid inventory data" });
  }
});

router.get("/auctions", async (req, res) => {
  try {
    const { status, buyerId } = req.query;
    const auctions = await storage.getChaintrackAuctions({
      status: status as string | undefined,
      buyerId: buyerId as string | undefined
    });
    res.json(auctions);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
});

router.post("/bids", async (req, res) => {
  try {
    const validatedData = insertChaintrackBidSchema.parse(req.body);
    const bid = await storage.placeChaintrackBid(validatedData);
    res.json(bid);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid bid data" });
  }
});

router.post("/bids/:id/accept", async (req, res) => {
  try {
    const { buyerId } = req.body;
    if (!buyerId) {
      return res.status(400).json({ error: "Buyer ID is required" });
    }
    
    const result = await storage.acceptChaintrackBid(req.params.id, buyerId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to accept bid" });
  }
});

export default router;
