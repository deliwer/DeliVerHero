export async function sendWhatsApp(phoneNumber: string, message: string) {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error("WhatsApp configuration missing");
    return { success: false, error: "Configuration missing" };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log(`WhatsApp message sent to ${phoneNumber}`);
    return { success: true, data };
  } catch (error) {
    console.error(`Failed to send WhatsApp to ${phoneNumber}:`, error);
    return { success: false, error };
  }
}
