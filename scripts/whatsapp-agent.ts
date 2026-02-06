import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer WhatsApp API Agent
 * Handles automated messaging via Meta WhatsApp Business API.
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId || accessToken.includes('TOKEN') || phoneNumberId.includes('ID')) {
    console.warn("Using Demo Mode: WhatsApp credentials not configured");
    return { success: true, demo: true, message: `Demo: WhatsApp to ${to} logged: ${message}` };
  }

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: { body: message }
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

    console.log("WhatsApp message sent successfully!");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error during WhatsApp API sending:", error.message);
    return { success: false, error: error.message };
  }
}

// Simple CLI runner
if (process.argv[1] && process.argv[1].endsWith('whatsapp-agent.ts')) {
  const to = process.argv[2] || "971523946311";
  const message = process.argv[3] || "Welcome to DeliWer! How can we help you with your Dubai relocation today?";

  sendWhatsAppMessage(to, message).then(res => {
    if (res.success) console.log("Done!");
    else process.exit(1);
  });
}
