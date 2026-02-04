import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer WhatsApp Business API Agent
 * Handles sending automated messages and templates via official API.
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  const accessToken = process.env.WHATSAPP_BUSINESS_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId || accessToken.includes('TOKEN') || phoneNumberId.includes('ID')) {
    console.error("Missing or invalid WHATSAPP_BUSINESS_ACCESS_TOKEN or WHATSAPP_BUSINESS_PHONE_NUMBER_ID");
    return { success: false, error: "Missing or invalid API credentials" };
  }

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      preview_url: true,
      body: message
    }
  };

  try {
    console.log(`Sending WhatsApp message to ${to}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`WhatsApp API Error: ${response.status} ${JSON.stringify(data)}`);
    }

    console.log("WhatsApp message sent successfully!", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("Error during WhatsApp API request:", error.message);
    return { success: false, error: error.message };
  }
}

// Simple CLI runner
import { fileURLToPath } from 'url';

const isMainModule = () => {
  if (typeof process !== 'undefined' && process.argv[1]) {
    const scriptPath = fileURLToPath(import.meta.url);
    return process.argv[1] === scriptPath || process.argv[1].endsWith('whatsapp-agent.ts');
  }
  return false;
};

if (isMainModule()) {
  const to = process.argv[2] || "971523946311";
  const message = process.argv[3] || "🚀 Hello from DeliWer! Your relocation support is now active on WhatsApp. Visit: https://deliwer.com/relocate";

  sendWhatsAppMessage(to, message).then(res => {
    if (res.success) {
      console.log("WhatsApp Send Successful!");
    } else {
      console.error("WhatsApp Send Failed.");
      process.exit(1);
    }
  });
}
