import { storage } from "../storage";
import OpenAI from "openai";

const openaiApiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const openai: OpenAI | null = openaiApiKey ? new OpenAI({
  apiKey: openaiApiKey,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
}) : null;

const CUSTOMER_SERVICE_NUMBERS = ["+971504547110", "+971523946311", "+971567148381"];
const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`;

export class WhatsAppAgentService {
  async sendDailyReferralCampaign() {
    console.log("🚀 Starting daily WhatsApp referral campaign...");
    
    // In a real scenario, we'd fetch actual affiliates/members
    // For now, we use the requested numbers as the targets for the "agentic" network
    const targets = CUSTOMER_SERVICE_NUMBERS;

    for (const phone of targets) {
      const message = this.generateReferralMessage(phone);
      await this.sendWhatsAppMessage(phone, message);
    }
  }

  private generateReferralMessage(phone: string) {
    const referralLink = `https://deliwer.com/refer?source=whatsapp&ref=${Buffer.from(phone).toString('base64')}`;
    return `Hello! This is DeliWerHero Admin. 🚀

Help us grow the network! Please forward this message to your friends or groups.

Copy your unique referral link to earn commissions:
${referralLink}

To participate, please fill out this format and send it back:
Name:
Area:
Interested in: [Water/Relocation/Cleaning]

Let's build the network together!`;
  }

  private async sendWhatsAppMessage(to: string, text: string) {
    if (!process.env.WHATSAPP_TOKEN || !process.env.PHONE_NUMBER_ID) {
      console.log(`[SIMULATED WHATSAPP] To: ${to}\nMessage: ${text}`);
      return;
    }

    try {
      const response = await fetch(WHATSAPP_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to.replace("+", ""),
          type: "text",
          text: { body: text },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("WhatsApp API Error:", error);
      } else {
        console.log(`✅ WhatsApp sent to ${to}`);
      }
    } catch (err) {
      console.error("Failed to send WhatsApp:", err);
    }
  }
}

export const whatsappAgent = new WhatsAppAgentService();
