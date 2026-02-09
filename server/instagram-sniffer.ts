import { leadApplications } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

// Simulated "sniffing" logic for Instagram intent
const INTENT_KEYWORDS = [
  "relocate", 
  "moving to dubai", 
  "apartment", 
  "dubai marina", 
  "new in dubai", 
  "shifting",
  "just landed",
  "relocating",
  "looking for apartment",
  "ejari",
  "renting",
  "tenancy contract"
];

const MOCK_COMMENTS = [
  "Planning to relocate soon! Any tips?",
  "Just landed in Dubai, looking for essentials.",
  "New in Dubai and need an apartment setup.",
  "Moving to Dubai Marina next week!",
  "Is it easy to get groceries delivered in Downtown?",
  "Looking for an apartment in JLT, any help?",
  "Just arrived! Where can I get basic home stuff fast?",
  "Finally got my Ejari sorted for the new place!",
  "Anyone know a good mover? Just signed my Ejari today.",
  "Ejari registration was a breeze, now for the furniture.",
  "Moved into a new studio in Business Bay, Ejari done."
];

export async function sniffInstagramIntent() {
  // In a real scenario, this would use Instagram Graph API Webhooks
  // Simulation: Generate a "found" intent every few minutes for demo
  const mockIGUser = `expat_user_${Math.floor(Math.random() * 1000)}`;
  const mockComment = MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)];
  
  // Create an "intercepted" lead
  try {
    const [newLead] = await db.insert(leadApplications).values({
      instagramHandle: mockIGUser,
      marketingStage: "intercepted",
      notes: `Live Intent: "${mockComment}"`,
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
