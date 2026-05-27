import { Router } from "express";
import { db } from "../db";
import { intelPosts, insertIntelPostSchema } from "@shared/schema";
import { eq } from "drizzle-orm";

const router = Router();
const ADMIN_SECRET = process.env.ADMIN_SECRET || "deliwer-admin-2026";

function isAdmin(req: any): boolean {
  return req.headers["x-admin-secret"] === ADMIN_SECRET;
}

// GET /posts — published only (admin gets all)
router.get("/posts", async (req, res) => {
  try {
    const rows = await db.select().from(intelPosts).orderBy(intelPosts.createdAt);
    const out = isAdmin(req) ? rows : rows.filter(p => p.status === "published");
    res.json(out.reverse());
  } catch (e: any) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /posts/:slug
router.get("/posts/:slug", async (req, res) => {
  try {
    const [post] = await db.select().from(intelPosts).where(eq(intelPosts.slug, req.params.slug));
    if (!post) return res.status(404).json({ error: "Not found" });
    if (post.status !== "published" && !isAdmin(req)) return res.status(404).json({ error: "Not found" });
    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// POST /posts — create (admin)
router.post("/posts", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: "Forbidden" });
  try {
    const parsed = insertIntelPostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [created] = await db.insert(intelPosts).values(parsed.data).returning();
    res.json(created);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to create: " + e.message });
  }
});

// PATCH /posts/:id/publish — toggle publish (admin)
router.patch("/posts/:id/publish", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: "Forbidden" });
  try {
    const [current] = await db.select().from(intelPosts).where(eq(intelPosts.id, req.params.id));
    if (!current) return res.status(404).json({ error: "Not found" });
    const newStatus = current.status === "published" ? "draft" : "published";
    const [updated] = await db.update(intelPosts).set({
      status: newStatus,
      publishedAt: newStatus === "published" ? new Date() : null,
    }).where(eq(intelPosts.id, req.params.id)).returning();
    res.json(updated);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to update: " + e.message });
  }
});

// DELETE /posts/:id (admin)
router.delete("/posts/:id", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: "Forbidden" });
  try {
    await db.delete(intelPosts).where(eq(intelPosts.id, req.params.id));
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: "Failed to delete: " + e.message });
  }
});

// POST /generate — AI article generation from brief (admin)
router.post("/generate", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: "Forbidden" });
  const { brief, route } = req.body;
  if (!brief?.trim()) return res.status(400).json({ error: "Brief is required" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Graceful simulation when no key configured
    const slug = brief.toLowerCase().slice(0, 60)
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      .split("-").slice(0, 6).join("-");
    return res.json({
      title: `Dubai Trade Intelligence: ${brief.slice(0, 45)}`,
      slug,
      metaDescription: `${brief.slice(0, 140)} — ChainTrack Dubai electronics logistics intelligence.`,
      keywords: "dubai electronics logistics, refurbished iphone trade, cis cargo corridors, dafza escrow, recommerce dubai, dubai cis air freight, chaintrack logistics",
      readTime: 5,
      body: `## Trade Intelligence Update\n\n${brief}\n\n## What This Means for Buyers\n\nThis development creates a direct opportunity for buyers operating across the CIS and Central Asian corridors. With Dubai's DAFZA freezone providing zero-duty re-export processing, the margin window is significant for buyers who move quickly.\n\n## Corridor & Escrow Context\n\nThe Dubai–CIS electronics corridor remains the most active recommerce route globally. DAFZA bonded storage combined with INSTC/CPEC onward connectivity creates a logistics stack that regional competitors cannot replicate. Air freight via DXB or DWC brings electronics from intake to CIS doorstep within 2–5 days.\n\nAll ChainTrack transactions are DAFZA-escrowed. Funds release only on confirmed delivery and grade compliance verification — eliminating wire fraud risk on both sides of the transaction.\n\n## Next Steps\n\nContact ChainTrack via WhatsApp to discuss lot specifications, escrow terms, and preferred delivery corridors. No minimum on enquiries.`,
      faqs: [
        { q: "How does this affect current buyers in the CIS market?", a: "Buyers should act on current pricing windows before corridor rates adjust. Contact ChainTrack to secure lot positions and escrow terms." },
        { q: "What escrow terms apply to ChainTrack transactions?", a: "All lots are DAFZA-escrowed. Funds release only on confirmed delivery and grade compliance. Full dispute resolution is available." },
        { q: "Which corridors does this trade intelligence apply to?", a: "Primarily Dubai–CIS corridors (Baku, Almaty, Tashkent) and the DWC–Gawadar charter lane to CPEC freezone." },
        { q: "How do I get started with ChainTrack logistics?", a: "Submit your lot specification via WhatsApp. No minimum on enquiries. Escrow available from the first transaction." },
      ],
    });
  }

  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are ChainTrack's trade intelligence content engine. From a brief operator note, generate an SEO-optimized trade intelligence article.

Return ONLY valid JSON with this structure:
{
  "title": "punchy headline 50-60 chars, include location/corridor/product",
  "slug": "URL-friendly kebab-case max 6 words",
  "metaDescription": "140-160 chars including primary keyword and CTA phrase",
  "keywords": "8-12 comma-separated long-tail SEO keywords",
  "readTime": 5,
  "body": "500-700 word markdown article. ## H2 sections only. Sections: Context, What This Means for Buyers, Corridor and Escrow, Next Steps. Weave in: Dubai electronics logistics, refurbished iPhone trade, CIS cargo, DAFZA escrow, recommerce. Tone: confident, direct, operational.",
  "faqs": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}, {"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
}`,
        },
        {
          role: "user",
          content: `Brief: ${brief}${route ? `\nAssociated trade route: ${route}` : ""}`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2500,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    res.json(result);
  } catch (e: any) {
    console.error("Intel generation error:", e.message);
    res.status(500).json({ error: "Generation failed: " + e.message });
  }
});

export default router;
