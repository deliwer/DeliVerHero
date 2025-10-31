import { Router } from "express";
import { storage } from "../storage";
import {
  insertChaintrackSellerSchema,
  insertChaintrackEscrowSchema,
  insertChaintrackShipmentSchema,
  insertChaintrackDocumentSchema,
  insertChaintrackAmlLogSchema,
  insertChaintrackAuditLogSchema,
  insertChaintrackComplianceAlertSchema,
} from "@shared/schema";
import { createHash } from "crypto";

const router = Router();

function calculateCommissionRate(
  sellerTier: string,
  hasSubscription: boolean,
  caAttested: boolean
): number {
  let baseRate = 250;
  
  switch (sellerTier) {
    case "premium":
      baseRate = 100;
      break;
    case "verified":
      baseRate = 150;
      break;
    default:
      baseRate = 250;
  }
  
  if (hasSubscription) {
    baseRate -= 25;
  }
  
  if (caAttested) {
    baseRate -= 20;
  }
  
  return Math.max(0, baseRate);
}

function calculateFees(
  totalAmount: number,
  sellerTier: string,
  hasSubscription: boolean,
  caAttested: boolean,
  fastRelease: boolean = false,
  customsBrokerage: number = 0,
  rodtepEligible: boolean = false
) {
  const commissionRate = calculateCommissionRate(sellerTier, hasSubscription, caAttested);
  const commissionFee = Math.floor((totalAmount * commissionRate) / 10000);
  
  const escrowFixedFee = 10000;
  const fxFee = Math.max(100, Math.floor(totalAmount * 0.002));
  const customsBrokerageFee = customsBrokerage;
  const fastReleaseFee = fastRelease ? Math.floor(totalAmount * 0.03) : 0;
  
  const rodtepCredit = rodtepEligible ? Math.min(Math.floor(totalAmount * 0.02), 50000) : 0;
  
  const totalFees = commissionFee + escrowFixedFee + fxFee + customsBrokerageFee + fastReleaseFee - rodtepCredit;
  const netToSeller = totalAmount - totalFees;
  
  return {
    commissionRate,
    commissionFee,
    escrowFixedFee,
    fxFee,
    customsBrokerageFee,
    fastReleaseFee,
    rodtepCredit,
    totalFees,
    netToSeller,
  };
}

function generateEscrowNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `ESCROW/DEL/${year}/${random}`;
}

function createAuditLog(
  userId: string | undefined,
  action: string,
  resourceType: string,
  resourceId: string,
  changes: any,
  previousHash: string | null
) {
  const logData = JSON.stringify({ userId, action, resourceType, resourceId, changes, timestamp: new Date().toISOString() });
  const currentHash = createHash("sha256").update(logData + (previousHash || "")).digest("hex");
  
  return {
    userId,
    action,
    resourceType,
    resourceId,
    changes,
    previousLogHash: previousHash,
    currentLogHash: currentHash,
  };
}

router.post("/sellers", async (req, res) => {
  try {
    const sellerData = insertChaintrackSellerSchema.parse(req.body);
    
    const seller = await storage.createChaintrackSeller(sellerData);
    
    await storage.createChaintrackAmlLog({
      sellerId: seller.id,
      eventType: "kyc_check",
      riskLevel: "low",
      flagReason: "Initial KYC submission",
      status: "pending",
    });
    
    const auditLog = createAuditLog(
      sellerData.userId,
      "seller_onboarded",
      "seller",
      seller.id,
      { seller },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(seller);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.get("/sellers", async (req, res) => {
  try {
    const sellers = await storage.getAllChaintrackSellers();
    res.json(sellers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sellers/user/:userId", async (req, res) => {
  try {
    const seller = await storage.getChaintrackSellerByUserId(req.params.userId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found for this user" });
    }
    res.json(seller);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/escrows", async (req, res) => {
  try {
    const escrowData = insertChaintrackEscrowSchema.parse({
      ...req.body,
      escrowNumber: generateEscrowNumber(),
    });
    
    const seller = await storage.getChaintrackSeller(escrowData.sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    
    const fees = calculateFees(
      escrowData.totalAmount,
      seller.sellerTier,
      seller.hasSubscription,
      false,
      false,
      0,
      true
    );
    
    const escrow = await storage.createChaintrackEscrow({
      ...escrowData,
      ...fees,
    });
    
    const auditLog = createAuditLog(
      escrowData.buyerId,
      "escrow_created",
      "escrow",
      escrow.id,
      { escrow },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(escrow);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post("/escrows/:id/deposit", async (req, res) => {
  try {
    const { swiftRef, remittanceAdviceUrl } = req.body;
    
    if (!swiftRef || !remittanceAdviceUrl) {
      return res.status(400).json({ error: "SWIFT reference and remittance advice required" });
    }
    
    const escrow = await storage.updateChaintrackEscrow(req.params.id, {
      buyerDepositSwiftRef: swiftRef,
      buyerDepositDate: new Date(),
      buyerRemittanceAdviceUrl: remittanceAdviceUrl,
      status: "buyer_deposited",
    });
    
    const auditLog = createAuditLog(
      escrow.buyerId,
      "deposit_confirmed",
      "escrow",
      escrow.id,
      { swiftRef, remittanceAdviceUrl },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(escrow);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/escrows/:id/partial-release", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.id);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    const partialAmount = Math.floor((escrow.netToSeller * escrow.partialReleasePercent) / 100);
    
    const updated = await storage.updateChaintrackEscrow(req.params.id, {
      partialReleasedAmount: partialAmount,
      partialReleasedAt: new Date(),
      partialReleaseSwiftRef: req.body.swiftRef,
      status: "partial_released",
    });
    
    const auditLog = createAuditLog(
      escrow.buyerId,
      "partial_release",
      "escrow",
      escrow.id,
      { amount: partialAmount, percent: escrow.partialReleasePercent },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/escrows/:id/full-release", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.id);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    const remainingAmount = escrow.netToSeller - (escrow.partialReleasedAmount || 0);
    
    const updated = await storage.updateChaintrackEscrow(req.params.id, {
      fullReleasedAmount: remainingAmount,
      fullReleasedAt: new Date(),
      fullReleaseSwiftRef: req.body.swiftRef,
      status: "fully_released",
    });
    
    const auditLog = createAuditLog(
      escrow.buyerId,
      "full_release",
      "escrow",
      escrow.id,
      { amount: remainingAmount },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/shipments", async (req, res) => {
  try {
    const shipmentData = insertChaintrackShipmentSchema.parse(req.body);
    const shipment = await storage.createChaintrackShipment(shipmentData);
    
    const auditLog = createAuditLog(
      undefined,
      "shipment_created",
      "shipment",
      shipment.id,
      { shipment },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(shipment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.get("/shipments", async (req, res) => {
  try {
    const { escrowId } = req.query;
    const shipments = await storage.getAllChaintrackShipments(escrowId as string | undefined);
    res.json(shipments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/shipments/:id", async (req, res) => {
  try {
    const shipment = await storage.updateChaintrackShipment(req.params.id, req.body);
    
    const auditLog = createAuditLog(
      undefined,
      "shipment_updated",
      "shipment",
      shipment.id,
      { updates: req.body },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(shipment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/documents", async (req, res) => {
  try {
    const documentData = insertChaintrackDocumentSchema.parse(req.body);
    const document = await storage.createChaintrackDocument(documentData);
    
    const auditLog = createAuditLog(
      documentData.uploadedBy,
      "document_upload",
      "document",
      document.id,
      { documentType: document.documentType, documentName: document.documentName },
      null
    );
    await storage.createChaintrackAuditLog(auditLog);
    
    res.json(document);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post("/aml-logs", async (req, res) => {
  try {
    const amlData = insertChaintrackAmlLogSchema.parse(req.body);
    const amlLog = await storage.createChaintrackAmlLog(amlData);
    
    if (amlData.riskLevel === "high" || amlData.riskLevel === "critical") {
      await storage.createChaintrackComplianceAlert({
        sellerId: amlData.sellerId,
        escrowId: amlData.escrowId,
        alertType: amlData.eventType,
        severity: amlData.riskLevel,
        message: `AML ${amlData.eventType} flagged: ${amlData.flagReason}`,
        status: "open",
      });
    }
    
    res.json(amlLog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

router.post("/calculate-fees", async (req, res) => {
  try {
    const { totalAmount, sellerTier, hasSubscription, caAttested, fastRelease, customsBrokerage, rodtepEligible } = req.body;
    
    if (!totalAmount) {
      return res.status(400).json({ error: "Total amount is required" });
    }
    
    const fees = calculateFees(
      totalAmount,
      sellerTier || "standard",
      hasSubscription || false,
      caAttested || false,
      fastRelease || false,
      customsBrokerage || 0,
      rodtepEligible || false
    );
    
    res.json(fees);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/evidence-pack/:escrowId", async (req, res) => {
  try {
    const escrow = await storage.getChaintrackEscrow(req.params.escrowId);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    
    const seller = await storage.getChaintrackSeller(escrow.sellerId);
    const shipments = await storage.getAllChaintrackShipments(escrow.id);
    const documents = await storage.getAllChaintrackDocuments(undefined, escrow.id, undefined);
    
    const evidencePack = {
      escrowNumber: escrow.escrowNumber,
      generatedAt: new Date().toISOString(),
      seller: {
        companyName: seller?.companyName,
        gstin: seller?.gstin,
        iecCode: seller?.iecCode,
        panNumber: seller?.panNumber,
      },
      transaction: {
        totalAmount: escrow.totalAmount,
        currency: escrow.currency,
        commissionRate: escrow.commissionRate / 100,
        totalFees: escrow.totalFees,
        netToSeller: escrow.netToSeller,
      },
      shipments: shipments.map(s => ({
        invoiceNumber: s.invoiceNumber,
        shippingBillNumber: s.shippingBillNumber,
        icegateReference: s.icegateReference,
        fircNumber: s.fircNumber,
        hsCode: s.hsCode,
        productDescription: s.productDescription,
        quantity: s.quantity,
        fobValue: s.fobValue,
      })),
      documents: documents.map(d => ({
        documentType: d.documentType,
        documentName: d.documentName,
        documentUrl: d.documentUrl,
        verificationStatus: d.verificationStatus,
      })),
      bankTransfers: {
        buyerDepositSwift: escrow.buyerDepositSwiftRef,
        partialReleaseSwift: escrow.partialReleaseSwiftRef,
        fullReleaseSwift: escrow.fullReleaseSwiftRef,
      },
      caAttestation: escrow.caAttested ? {
        caName: escrow.caName,
        certificateNumber: escrow.caCertificateNumber,
        attestationUrl: escrow.caAttestationUrl,
      } : null,
    };
    
    res.json(evidencePack);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
