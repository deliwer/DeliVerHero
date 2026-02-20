import { storage } from "./storage";
import { type EjariConversation } from "@shared/schema";

export const CONCIERGE_MESSAGES = {
  AGENT_1_INTRO: "Congrats on your Ejari 🎉\nWhen are you moving in?\n1️⃣ Within 7 days\n2️⃣ 7–14 days\n3️⃣ Later",
  AGENT_2_WATER: "Have you checked the water taste or shower yet?",
  AGENT_2_CLEANING: "Do you need deep cleaning before furniture arrives?",
  AGENT_2_FIXES: "Any small fixes needed before move-in (lights, curtains, hooks)?",
  AGENT_3_STARTER_PACK: "Most tenants with a fresh Ejari do this before moving in:\n\n✅ Ejari Starter Pack\n• Water setup + shower filter\n• Pre-move deep cleaning\n\nThis avoids issues in your first week.\n\nWant me to book this before your move-in?",
  AGENT_3_BASIC_HELP: "We recommend our Basic Move-In Help for a smooth transition. Want me to help you set that up?",
  HUMAN_HANDOFF: "A human concierge will be with you shortly to finalize your booking. 📲"
};

export async function handleConciergeInput(phone: string, input: string) {
  let conversation = await storage.getConciergeConversation(phone);

  if (!conversation) {
    conversation = await storage.createConciergeConversation({
      phoneNumber: phone,
      status: "QUALIFYING",
      platform: "website",
      lastAgent: "agent_1"
    });
    return CONCIERGE_MESSAGES.AGENT_1_INTRO;
  }

  if (conversation.status === "QUALIFYING") {
    // Basic mapping for MVP
    if (input.includes("1") || input.toLowerCase().includes("7 days")) conversation.moveInTiming = "WITHIN_7_DAYS";
    else if (input.includes("2") || input.toLowerCase().includes("14 days")) conversation.moveInTiming = "7_14_DAYS";
    else conversation.moveInTiming = "LATER";
    
    conversation.status = "PROBLEM_ID";
    await storage.updateConciergeConversation(conversation.id, conversation);
    return CONCIERGE_MESSAGES.AGENT_2_WATER;
  }

  if (conversation.status === "PROBLEM_ID") {
    if (conversation.waterCheck === null) {
      conversation.waterCheck = input.toLowerCase().includes("yes") || input.toLowerCase().includes("no");
      await storage.updateConciergeConversation(conversation.id, conversation);
      return CONCIERGE_MESSAGES.AGENT_2_CLEANING;
    }
    if (conversation.cleaningCheck === null) {
      conversation.cleaningCheck = input.toLowerCase().includes("yes");
      await storage.updateConciergeConversation(conversation.id, conversation);
      return CONCIERGE_MESSAGES.AGENT_2_FIXES;
    }
    if (conversation.fixesCheck === null) {
      conversation.fixesCheck = input.toLowerCase().includes("yes");
      conversation.status = "OFFERING";
      await storage.updateConciergeConversation(conversation.id, conversation);
      
      if (conversation.waterCheck || conversation.cleaningCheck) {
        return CONCIERGE_MESSAGES.AGENT_3_STARTER_PACK;
      }
      return CONCIERGE_MESSAGES.AGENT_3_BASIC_HELP;
    }
  }

  if (conversation.status === "OFFERING") {
    conversation.status = "READY_FOR_HUMAN";
    await storage.updateConciergeConversation(conversation.id, conversation);
    return CONCIERGE_MESSAGES.HUMAN_HANDOFF;
  }

  return "Concierge is currently paused while a human reviews your request.";
}
