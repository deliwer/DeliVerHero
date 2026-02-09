import { leadApplications } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

// Simulated "sniffing" logic for Instagram intent
const INTENT_KEYWORDS = ["relocate", "moving to dubai", "apartment", "dubai marina", "new indubai", "shifting"];

export async function sniffInstagramIntent() {
  // In a real scenario, this would use Instagram Graph API Webhooks
  // Simulation: Generate a "found" intent every few minutes for demo
  const mockIGUser = `expat_user_${Math.floor(Math.random() * 1000)}`;
  const mockComment = `Planning to ${INTENT_KEYWORDS[Math.floor(Math.random() * INTENT_KEYWORDS.length)]} soon! Any tips?`;
  
  // Create an "intercepted" lead
  try {
    const [newLead] = await db.insert(leadApplications).values({
      instagramHandle: mockIGUser,
      marketingStage: "intercepted",
      notes: `Automated Sniff: "${mockComment}"`,
      source: "instagram_sniff",
      whatsappStatus: "pending",
      nextAction: "Send relocation checklist via DM"
    }).returning();
    
    return newLead;
  } catch (error) {
    console.error("Sniffing error:", error);
  }
}

// Set up periodic sniffing simulation
if (process.env.NODE_ENV === "development") {
  setInterval(async () => {
    await sniffInstagramIntent();
    console.log("Instagram Sniffer: Intercepted potential relocation intent.");
  }, 60000); // Check every minute
}
