import { Router } from "express";
import { db } from "../db";
import { buyLots, buyBuyers, buyOrders, buyBids } from "@shared/schema";
import { eq, and, desc, or, ilike, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { createHash } from "crypto";

const router = Router();

function hashPassword(pw: string): string {
  return createHash("sha256").update(pw + "buy_chaintrack_salt_2026").digest("hex");
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  return `BUY/CT/${year}/${seq}`;
}

function generateEscrowRef(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `ESCROW/BUY/${year}/${seq}`;
}

// ── Seed sample lots ────────────────────────────────────────────────────────
const SAMPLE_LOTS = [
  {
    lotNumber: "LOT-2026-001",
    productName: "iPhone 14 Pro Max — Grade A Lot",
    productType: "smartphone",
    brand: "Apple",
    model: "iPhone 14 Pro Max 256GB",
    grade: "A",
    quantity: 500,
    availableQty: 487,
    unitPrice: 45000, // $450.00
    lotPrice: 22500000, // $225,000
    currency: "USD",
    originCountry: "USA",
    supplierName: "TechFlow Distribution Inc.",
    hsCode: "8517.12",
    condition: "refurbished",
    batteryHealth: 89,
    functionalScore: 96,
    cosmeticScore: 91,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 50,
    lotType: "supplier_feed",
    tags: ["Apple", "5G", "OLED", "Face ID", "Bulk"],
    defects: ["Minor screen micro-scratches on 8% of units", "Original box not included"],
    incoterms: ["FOB Dubai", "CIF Almaty", "CIF Moscow"],
    status: "active",
  },
  {
    lotNumber: "LOT-2026-002",
    productName: "Samsung Galaxy S23 Ultra — Grade B Lot",
    productType: "smartphone",
    brand: "Samsung",
    model: "Galaxy S23 Ultra 512GB",
    grade: "B",
    quantity: 800,
    availableQty: 740,
    unitPrice: 31000, // $310.00
    lotPrice: 24800000,
    currency: "USD",
    originCountry: "South Korea",
    supplierName: "SeoulTech Exports Ltd.",
    hsCode: "8517.12",
    condition: "refurbished",
    batteryHealth: 82,
    functionalScore: 92,
    cosmeticScore: 79,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 100,
    lotType: "supplier_feed",
    tags: ["Samsung", "5G", "S Pen", "Bulk", "CIS Ready"],
    defects: ["Light body scratches on 22% of units", "Battery cycle 180–240"],
    incoterms: ["FOB Dubai", "EXW Dubai", "CIF Tashkent"],
    status: "active",
  },
  {
    lotNumber: "LOT-2026-003",
    productName: "Apple MacBook Pro 14\" M2 — Grade A+ Lot",
    productType: "laptop",
    brand: "Apple",
    model: "MacBook Pro 14\" M2 Pro 16GB/512GB",
    grade: "A+",
    quantity: 120,
    availableQty: 120,
    unitPrice: 160000, // $1,600.00
    lotPrice: 19200000,
    currency: "USD",
    originCountry: "USA",
    supplierName: "PrimeTech Corp.",
    hsCode: "8471.30",
    condition: "like_new",
    batteryHealth: 97,
    functionalScore: 99,
    cosmeticScore: 98,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 10,
    lotType: "supplier_feed",
    tags: ["Apple", "M2", "Pro", "Like New", "Retail Box"],
    defects: [],
    incoterms: ["FOB Dubai", "DDP Moscow", "CIF Almaty"],
    status: "active",
  },
  {
    lotNumber: "LOT-2026-004",
    productName: "iPad Pro 12.9\" M2 Wi-Fi — Grade A Lot",
    productType: "tablet",
    brand: "Apple",
    model: "iPad Pro 12.9\" M2 256GB Wi-Fi",
    grade: "A",
    quantity: 300,
    availableQty: 271,
    unitPrice: 65000, // $650.00
    lotPrice: 19500000,
    currency: "USD",
    originCountry: "USA",
    supplierName: "Cupertino Assets LLC",
    hsCode: "8471.30",
    condition: "refurbished",
    batteryHealth: 91,
    functionalScore: 97,
    cosmeticScore: 94,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 25,
    lotType: "supplier_feed",
    tags: ["Apple", "M2", "Tablet", "Bulk", "5G Optional"],
    defects: ["5% units with minor bezel hairline"],
    incoterms: ["FOB Dubai", "CIF Lagos", "CIF Nairobi"],
    status: "active",
  },
  {
    lotNumber: "LOT-2026-005",
    productName: "Xiaomi Redmi Note 12 Pro — Grade A Bulk",
    productType: "smartphone",
    brand: "Xiaomi",
    model: "Redmi Note 12 Pro 256GB",
    grade: "A",
    quantity: 2000,
    availableQty: 1950,
    unitPrice: 14500, // $145.00
    lotPrice: 29000000,
    currency: "USD",
    originCountry: "China",
    supplierName: "SinoGlobe Trading Ltd.",
    hsCode: "8517.12",
    condition: "new",
    batteryHealth: 100,
    functionalScore: 100,
    cosmeticScore: 100,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 200,
    lotType: "supplier_feed",
    tags: ["Xiaomi", "5G", "New", "Sealed", "Africa Ready"],
    defects: [],
    incoterms: ["FOB Dubai", "CIF Lagos", "CIF Cairo", "DDP Nairobi"],
    status: "active",
  },
  {
    lotNumber: "LOT-2026-006",
    productName: "Google Pixel 7 Pro — Grade B+ Lot",
    productType: "smartphone",
    brand: "Google",
    model: "Pixel 7 Pro 128GB",
    grade: "B+",
    quantity: 450,
    availableQty: 410,
    unitPrice: 28000, // $280.00
    lotPrice: 12600000,
    currency: "USD",
    originCountry: "USA",
    supplierName: "TechFlow Distribution Inc.",
    hsCode: "8517.12",
    condition: "refurbished",
    batteryHealth: 85,
    functionalScore: 93,
    cosmeticScore: 82,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 50,
    lotType: "supplier_feed",
    tags: ["Google", "Pixel", "5G", "Tensor", "AI Camera"],
    defects: ["Battery cycle 150–200", "Minor chassis scuffs on 15%"],
    incoterms: ["FOB Dubai", "EXW Dubai"],
    status: "active",
  },
  // ── Reverse Bid Lots ─────────────────────────────────────────────────────
  {
    lotNumber: "RBID-2026-001",
    productName: "iPhone 15 Pro — 1,000 Unit Lot REVERSE BID",
    productType: "smartphone",
    brand: "Apple",
    model: "iPhone 15 Pro 256GB",
    grade: "A",
    quantity: 1000,
    availableQty: 1000,
    unitPrice: 0,
    lotPrice: 0,
    currency: "USD",
    originCountry: "USA",
    supplierName: "Apex Global Corp.",
    hsCode: "8517.12",
    condition: "refurbished",
    batteryHealth: 88,
    functionalScore: 95,
    cosmeticScore: 90,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 1000,
    lotType: "reverse_bid",
    startingBid: 55000000, // $550,000 starting
    currentBid: 52800000, // $528,000 current best
    bidCount: 7,
    tags: ["Apple", "5G", "Dynamic Island", "Premium Lot"],
    defects: ["Minor scratches 12%", "Battery 85–92%"],
    incoterms: ["FOB Dubai", "CIF Buyer's Port"],
    status: "active",
  },
  {
    lotNumber: "RBID-2026-002",
    productName: "Mixed Laptop Lot — Dell/HP/Lenovo Grade B",
    productType: "laptop",
    brand: "Mixed",
    model: "Dell Latitude / HP EliteBook / Lenovo ThinkPad",
    grade: "B",
    quantity: 200,
    availableQty: 200,
    unitPrice: 0,
    lotPrice: 0,
    currency: "USD",
    originCountry: "Germany",
    supplierName: "EuroAsset Liquidations GmbH",
    hsCode: "8471.30",
    condition: "refurbished",
    batteryHealth: 75,
    functionalScore: 88,
    cosmeticScore: 76,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 200,
    lotType: "reverse_bid",
    startingBid: 12000000, // $120,000
    currentBid: 10900000,
    bidCount: 4,
    tags: ["Bulk Laptops", "Grade B", "Corporate Lease Returns", "EU Origin"],
    defects: ["Mixed conditions", "Some with cosmetic damage", "No original chargers"],
    incoterms: ["FOB Dubai", "EXW Dubai"],
    status: "active",
  },
  {
    lotNumber: "RBID-2026-003",
    productName: "Samsung Galaxy Tab S8 Ultra — 500 Units",
    productType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S8 Ultra 256GB Wi-Fi",
    grade: "A+",
    quantity: 500,
    availableQty: 500,
    unitPrice: 0,
    lotPrice: 0,
    currency: "USD",
    originCountry: "South Korea",
    supplierName: "SeoulTech Exports Ltd.",
    hsCode: "8471.30",
    condition: "like_new",
    batteryHealth: 95,
    functionalScore: 98,
    cosmeticScore: 97,
    inspectionStatus: "completed",
    inspectedBy: "ChainTrack Certified — Dubai",
    clearanceStatus: "cleared",
    exportReady: true,
    minOrderQty: 500,
    lotType: "reverse_bid",
    startingBid: 40000000,
    currentBid: 38500000,
    bidCount: 3,
    tags: ["Samsung", "Like New", "AMOLED", "S Pen", "Premium"],
    defects: [],
    incoterms: ["FOB Dubai", "CIF Almaty", "CIF Moscow"],
    status: "active",
  },
];

async function seedLotsIfEmpty() {
  try {
    const existing = await db.select({ id: buyLots.id }).from(buyLots).limit(1);
    if (existing.length > 0) return;

    const auctionEnd1 = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const auctionEnd2 = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const auctionEnd3 = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000);

    const inspectedDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < SAMPLE_LOTS.length; i++) {
      const lot = SAMPLE_LOTS[i];
      const auctionEndDate =
        lot.lotType === "reverse_bid"
          ? i === 6 ? auctionEnd1 : i === 7 ? auctionEnd2 : auctionEnd3
          : null;

      await db.insert(buyLots).values({
        ...lot,
        inspectedAt: inspectedDate,
        auctionEndDate,
        metadata: {},
      });
    }
    console.log("[Buy Module] Seeded", SAMPLE_LOTS.length, "sample lots");
  } catch (err) {
    console.error("[Buy Module] Seed error:", err);
  }
}

// Seed on module load
seedLotsIfEmpty();

// ── Auth routes ─────────────────────────────────────────────────────────────

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, companyName, contactName, phone, country, tradeLicense, vatNumber } = req.body;
    if (!email || !password || !companyName || !contactName || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await db.select().from(buyBuyers).where(eq(buyBuyers.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const [buyer] = await db.insert(buyBuyers).values({
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      companyName,
      contactName,
      phone,
      country: country || "UAE",
      tradeLicense: tradeLicense || null,
      vatNumber: vatNumber || null,
      buyerTier: "standard",
      kycStatus: "pending",
      status: "active",
      metadata: {},
    }).returning();

    const token = Buffer.from(JSON.stringify({ id: buyer.id, email: buyer.email, ts: Date.now() })).toString("base64");
    const { passwordHash: _, ...safebuyer } = buyer;
    res.json({ buyer: safebuyer, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Registration failed" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const [buyer] = await db.select().from(buyBuyers)
      .where(and(eq(buyBuyers.email, email.toLowerCase()), eq(buyBuyers.status, "active")))
      .limit(1);

    if (!buyer || buyer.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = Buffer.from(JSON.stringify({ id: buyer.id, email: buyer.email, ts: Date.now() })).toString("base64");
    const { passwordHash: _, ...safeBuyer } = buyer;
    res.json({ buyer: safeBuyer, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Login failed" });
  }
});

router.get("/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    const [buyer] = await db.select().from(buyBuyers).where(eq(buyBuyers.id, payload.id)).limit(1);
    if (!buyer) return res.status(401).json({ error: "Buyer not found" });
    const { passwordHash: _, ...safeBuyer } = buyer;
    res.json(safeBuyer);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ── Lots (Marketplace & Reverse Bids) ───────────────────────────────────────

router.get("/lots", async (req, res) => {
  try {
    const { lotType, brand, grade, minPrice, maxPrice, search, status } = req.query;

    let query = db.select().from(buyLots);
    const conditions: any[] = [eq(buyLots.status, (status as string) || "active")];

    if (lotType) conditions.push(eq(buyLots.lotType, lotType as string));
    if (brand) conditions.push(ilike(buyLots.brand, `%${brand}%`));
    if (grade) conditions.push(eq(buyLots.grade, grade as string));
    if (minPrice) conditions.push(sql`${buyLots.unitPrice} >= ${parseInt(minPrice as string)}`);
    if (maxPrice) conditions.push(sql`${buyLots.unitPrice} <= ${parseInt(maxPrice as string)}`);
    if (search) conditions.push(
      or(
        ilike(buyLots.productName, `%${search}%`),
        ilike(buyLots.brand, `%${search}%`),
        ilike(buyLots.model, `%${search}%`),
        ilike(buyLots.supplierName, `%${search}%`),
      )!
    );

    const lots = await db.select().from(buyLots)
      .where(and(...conditions))
      .orderBy(desc(buyLots.createdAt));

    res.json(lots);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/lots/:id", async (req, res) => {
  try {
    const [lot] = await db.select().from(buyLots).where(eq(buyLots.id, req.params.id)).limit(1);
    if (!lot) return res.status(404).json({ error: "Lot not found" });

    const bids = await db.select().from(buyBids)
      .where(eq(buyBids.lotId, req.params.id))
      .orderBy(desc(buyBids.createdAt))
      .limit(10);

    res.json({ ...lot, recentBids: bids });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Orders ───────────────────────────────────────────────────────────────────

router.post("/orders", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    const { lotId, quantity, incoterm, destinationCountry, shippingAddress, notes } = req.body;
    if (!lotId || !quantity || !incoterm || !destinationCountry) {
      return res.status(400).json({ error: "Missing required fields: lotId, quantity, incoterm, destinationCountry" });
    }

    const [lot] = await db.select().from(buyLots).where(eq(buyLots.id, lotId)).limit(1);
    if (!lot) return res.status(404).json({ error: "Lot not found" });
    if (lot.status !== "active") return res.status(400).json({ error: "Lot is no longer available" });
    if (quantity < lot.minOrderQty) return res.status(400).json({ error: `Minimum order quantity is ${lot.minOrderQty}` });
    if (quantity > lot.availableQty) return res.status(400).json({ error: `Only ${lot.availableQty} units available` });

    const unitPrice = lot.lotType === "supplier_feed" ? lot.unitPrice : (lot.currentBid || lot.startingBid || 0);
    const totalAmount = unitPrice * quantity;
    const escrowNumber = generateEscrowRef();
    const orderNumber = generateOrderNumber();

    const [order] = await db.insert(buyOrders).values({
      orderNumber,
      buyerId: payload.id,
      lotId,
      orderType: lot.lotType === "reverse_bid" ? "auction_win" : "direct",
      productName: lot.productName,
      quantity,
      unitPrice,
      totalAmount,
      currency: lot.currency,
      incoterm,
      destinationCountry,
      shippingAddress: shippingAddress || {},
      inspectionStatus: "passed",
      clearanceStatus: lot.clearanceStatus,
      paymentStatus: "pending",
      escrowNumber,
      shipmentStatus: "pending",
      estimatedDelivery: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB"),
      status: "confirmed",
      notes: notes || null,
      metadata: { lotNumber: lot.lotNumber, grade: lot.grade, supplier: lot.supplierName },
    }).returning();

    // Update available qty
    await db.update(buyLots)
      .set({ availableQty: lot.availableQty - quantity, updatedAt: new Date() })
      .where(eq(buyLots.id, lotId));

    // Update buyer stats
    await db.update(buyBuyers)
      .set({
        totalOrders: sql`${buyBuyers.totalOrders} + 1`,
        totalSpend: sql`${buyBuyers.totalSpend} + ${totalAmount}`,
        updatedAt: new Date(),
      })
      .where(eq(buyBuyers.id, payload.id));

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Order failed" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    const orders = await db.select().from(buyOrders)
      .where(eq(buyOrders.buyerId, payload.id))
      .orderBy(desc(buyOrders.createdAt));

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    const [order] = await db.select().from(buyOrders)
      .where(and(eq(buyOrders.id, req.params.id), eq(buyOrders.buyerId, payload.id)))
      .limit(1);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const [lot] = await db.select().from(buyLots).where(eq(buyLots.id, order.lotId)).limit(1);
    res.json({ ...order, lot });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Bids ─────────────────────────────────────────────────────────────────────

router.post("/bids", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    const { lotId, bidAmount, quantity, notes } = req.body;
    if (!lotId || !bidAmount) return res.status(400).json({ error: "lotId and bidAmount required" });

    const [lot] = await db.select().from(buyLots).where(eq(buyLots.id, lotId)).limit(1);
    if (!lot) return res.status(404).json({ error: "Lot not found" });
    if (lot.lotType !== "reverse_bid") return res.status(400).json({ error: "This lot does not accept bids" });
    if (lot.status !== "active") return res.status(400).json({ error: "Lot is no longer active" });
    if (lot.auctionEndDate && new Date(lot.auctionEndDate) < new Date()) {
      return res.status(400).json({ error: "Auction has ended" });
    }

    const currentBest = lot.currentBid || lot.startingBid || 0;
    if (bidAmount >= currentBest) {
      return res.status(400).json({ error: `Your bid must be below the current best: $${(currentBest / 100).toLocaleString()}` });
    }

    const [bid] = await db.insert(buyBids).values({
      lotId,
      buyerId: payload.id,
      bidAmount,
      quantity: quantity || lot.minOrderQty,
      status: "active",
      notes: notes || null,
    }).returning();

    // Mark previous bids as outbid
    await db.update(buyBids)
      .set({ status: "outbid" })
      .where(and(eq(buyBids.lotId, lotId), sql`${buyBids.id} != ${bid.id}`, eq(buyBids.status, "active")));

    // Update lot with new current bid
    await db.update(buyLots)
      .set({
        currentBid: bidAmount,
        bidCount: sql`${buyLots.bidCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(buyLots.id, lotId));

    res.status(201).json(bid);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Bid failed" });
  }
});

router.get("/bids", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
    const token = authHeader.slice(7);
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    const bids = await db.select().from(buyBids)
      .where(eq(buyBids.buyerId, payload.id))
      .orderBy(desc(buyBids.createdAt));

    res.json(bids);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Founder Admin API ─────────────────────────────────────────────────────────
const ADMIN_SECRET = process.env.ADMIN_SECRET || "deliwer-admin-2026";

function adminAuth(req: any, res: any, next: any) {
  if (req.headers["x-admin-secret"] !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized — admin secret required" });
  }
  next();
}

function generateLotNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  return `CT-${ts}`;
}

// Stats
router.get("/admin/stats", adminAuth, async (_req, res) => {
  try {
    const [lotRows, buyerRows, bidRows, orderRows] = await Promise.all([
      db.select().from(buyLots),
      db.select().from(buyBuyers),
      db.select().from(buyBids),
      db.select().from(buyOrders),
    ]);
    const activeLots = lotRows.filter(l => l.status === "active").length;
    const auctionLots = lotRows.filter(l => l.lotType === "reverse_bid" && l.status === "active").length;
    const verifiedBuyers = buyerRows.filter(b => b.kycStatus === "approved").length;
    const totalDemandUnits = bidRows.reduce((s, b) => s + (b.quantity || 0), 0);
    const totalRevenue = orderRows.reduce((s, o) => s + (o.totalAmount || 0), 0);
    res.json({
      totalLots: lotRows.length, activeLots, auctionLots,
      totalBuyers: buyerRows.length, verifiedBuyers,
      totalBids: bidRows.length, totalDemandUnits,
      totalOrders: orderRows.length, totalRevenue,
    });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// All lots (all statuses)
router.get("/admin/lots", adminAuth, async (_req, res) => {
  try {
    const lots = await db.select().from(buyLots).orderBy(desc(buyLots.createdAt));
    res.json(lots);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Create lot (prices sent in USD dollars, stored as cents)
router.post("/admin/lots", adminAuth, async (req, res) => {
  try {
    const {
      productName, brand, model, grade, lotType, quantity, unitPriceDollars,
      originCountry, supplierName, minOrderQty, auctionEndDate, startingBidDollars,
      condition, incoterms, tags,
    } = req.body;
    if (!productName || !model || !grade || !quantity || !originCountry || !supplierName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const unitPrice = Math.round((unitPriceDollars || 0) * 100);
    const startingBid = startingBidDollars ? Math.round(startingBidDollars * 100) : undefined;
    const qty = parseInt(quantity);
    const [lot] = await db.insert(buyLots).values({
      lotNumber: generateLotNumber(),
      productName, brand: brand || "Apple", model, grade,
      lotType: lotType || "supplier_feed",
      quantity: qty,
      availableQty: qty,
      unitPrice,
      lotPrice: unitPrice * qty,
      currency: "USD",
      originCountry, supplierName,
      condition: condition || "refurbished",
      minOrderQty: parseInt(minOrderQty) || 25,
      functionalScore: 92, cosmeticScore: 88,
      inspectionStatus: "completed", clearanceStatus: "cleared",
      exportReady: true,
      auctionEndDate: auctionEndDate ? new Date(auctionEndDate) : undefined,
      startingBid: startingBid,
      currentBid: startingBid,
      incoterms: incoterms || ["FOB", "CIF"],
      tags: tags || [],
      photos: [], defects: [],
      status: "active", metadata: { createdByAdmin: true },
    }).returning();
    res.status(201).json(lot);
  } catch (err: any) { res.status(400).json({ error: err.message }); }
});

// Update lot
router.patch("/admin/lots/:id", adminAuth, async (req, res) => {
  try {
    const { status, availableQty, unitPriceDollars, startingBidDollars, auctionEndDate, supplierName, tags, metadata } = req.body;
    const updates: Record<string, any> = { updatedAt: new Date() };
    if (status !== undefined) updates.status = status;
    if (availableQty !== undefined) updates.availableQty = parseInt(availableQty);
    if (unitPriceDollars !== undefined) { updates.unitPrice = Math.round(unitPriceDollars * 100); }
    if (startingBidDollars !== undefined) updates.startingBid = Math.round(startingBidDollars * 100);
    if (auctionEndDate !== undefined) updates.auctionEndDate = new Date(auctionEndDate);
    if (supplierName !== undefined) updates.supplierName = supplierName;
    if (tags !== undefined) updates.tags = tags;
    if (metadata !== undefined) updates.metadata = metadata;
    const [lot] = await db.update(buyLots).set(updates).where(eq(buyLots.id, req.params.id)).returning();
    if (!lot) return res.status(404).json({ error: "Lot not found" });
    res.json(lot);
  } catch (err: any) { res.status(400).json({ error: err.message }); }
});

// Archive lot
router.delete("/admin/lots/:id", adminAuth, async (req, res) => {
  try {
    await db.update(buyLots).set({ status: "archived", updatedAt: new Date() }).where(eq(buyLots.id, req.params.id));
    res.json({ ok: true });
  } catch (err: any) { res.status(400).json({ error: err.message }); }
});

// All buyers
router.get("/admin/buyers", adminAuth, async (_req, res) => {
  try {
    const buyers = await db.select({
      id: buyBuyers.id, email: buyBuyers.email, companyName: buyBuyers.companyName,
      contactName: buyBuyers.contactName, phone: buyBuyers.phone, country: buyBuyers.country,
      buyerTier: buyBuyers.buyerTier, kycStatus: buyBuyers.kycStatus, status: buyBuyers.status,
      totalOrders: buyBuyers.totalOrders, totalSpend: buyBuyers.totalSpend,
      createdAt: buyBuyers.createdAt, verifiedAt: buyBuyers.verifiedAt, metadata: buyBuyers.metadata,
    }).from(buyBuyers).orderBy(desc(buyBuyers.createdAt));
    res.json(buyers);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Update buyer
router.patch("/admin/buyers/:id", adminAuth, async (req, res) => {
  try {
    const { buyerTier, kycStatus, status } = req.body;
    const updates: Record<string, any> = { updatedAt: new Date() };
    if (buyerTier) updates.buyerTier = buyerTier;
    if (kycStatus) { updates.kycStatus = kycStatus; if (kycStatus === "approved") updates.verifiedAt = new Date(); }
    if (status) updates.status = status;
    const [buyer] = await db.update(buyBuyers).set(updates).where(eq(buyBuyers.id, req.params.id)).returning();
    const { passwordHash: _, ...safe } = buyer;
    res.json(safe);
  } catch (err: any) { res.status(400).json({ error: err.message }); }
});

// All bids (across all lots, with lot info joined)
router.get("/admin/bids", adminAuth, async (_req, res) => {
  try {
    const bids = await db.select({
      id: buyBids.id, lotId: buyBids.lotId, buyerId: buyBids.buyerId,
      bidAmount: buyBids.bidAmount, quantity: buyBids.quantity,
      status: buyBids.status, notes: buyBids.notes, createdAt: buyBids.createdAt,
      lotNumber: buyLots.lotNumber, productName: buyLots.productName,
      buyerCompany: buyBuyers.companyName, buyerCountry: buyBuyers.country,
    }).from(buyBids)
      .leftJoin(buyLots, eq(buyBids.lotId, buyLots.id))
      .leftJoin(buyBuyers, eq(buyBids.buyerId, buyBuyers.id))
      .orderBy(desc(buyBids.createdAt));
    res.json(bids);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

export default router;
