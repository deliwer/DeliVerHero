import { Router, type Request, type Response } from "express";
import { sendWhatsApp } from "../utils/sendWhatsApp";
import { handleConciergeInput } from "../concierge";

const router = Router();

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Core routing logic for inbound WhatsApp messages.
 * Returns the reply text to send back to the user.
 * Keeps the conversational state-machine from the original concierge flow,
 * with an initial keyword-triggered menu for new contacts.
 */
async function buildReply(from: string, text: string): Promise<string> {
  const input = text?.trim() ?? "";
  const lower = input.toLowerCase();

  // Greeting / entry keywords → show top-level menu
  if (
    !input ||
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower === "start" ||
    lower.includes("ejari") ||
    lower.includes("help")
  ) {
    return (
      "Welcome to DeliWer 👋\n" +
      "We help people moving into Dubai or fixing life at home.\n\n" +
      "Please reply with a number so we can help fast:\n\n" +
      "1️⃣ Moving into Dubai (Ejari & Biometrics)\n" +
      "2️⃣ Already living here & need help\n" +
      "3️⃣ Moving out / furniture disposal\n" +
      "4️⃣ Something else"
    );
  }

  // Menu selections
  switch (input) {
    case "1":
      return (
        "Got it 👍\n" +
        "As an authorized RERA Appointed Trustee Center, we handle Ejari & Biometrics instantly.\n\n" +
        "Are you:\n" +
        "1️⃣ Tenant needing Ejari registration\n" +
        "2️⃣ Landlord needing verification\n" +
        "3️⃣ Just moved in and need home setup"
      );
    case "2":
      return (
        "Understood 👍\n" +
        "What do you need help with today?\n\n" +
        "You can reply in one line, for example:\n" +
        "• Fix something at home\n" +
        "• Furniture removal\n" +
        "• Cleaning or maintenance\n" +
        "• General living support"
      );
    case "3":
      return (
        "Thanks 👍\n" +
        "Is this for:\n" +
        "1️⃣ Furniture & appliance disposal\n" +
        "2️⃣ Move-out cleaning\n" +
        "3️⃣ Full move-out support?"
      );
    case "4":
      return "No problem 👍\nPlease describe what you need help with in one or two lines.";
  }

  // For all other free-text input, run through the Ejari concierge state-machine
  try {
    const conciergeReply = await handleConciergeInput(from, input);
    return conciergeReply;
  } catch (err) {
    console.error("[WhatsApp Webhook] Concierge error:", err);
    return (
      "Thanks. A DeliWer living support manager will reply shortly.\n\n" +
      "If urgent, please mention:\n• Location\n• Timeline\n• Budget range (if known)"
    );
  }
}

// ── GET — Meta webhook verification ────────────────────────────────────────
// Meta sends this once when you configure the webhook URL in the developer portal.
// Set WHATSAPP_VERIFY_TOKEN to any string you choose, then enter the same
// string in the Meta dashboard under Webhook > Verify Token.
router.get("/", (req: Request, res: Response) => {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!verifyToken) {
    console.warn("[WhatsApp Webhook] WHATSAPP_VERIFY_TOKEN not set — rejecting verification");
    return res.sendStatus(403);
  }

  if (mode === "subscribe" && token === verifyToken) {
    console.log("[WhatsApp Webhook] Verification successful ✓");
    return res.status(200).send(challenge);
  }

  console.warn("[WhatsApp Webhook] Verification failed — token mismatch");
  return res.sendStatus(403);
});

// ── POST — Inbound messages from Meta ──────────────────────────────────────
// Meta wraps every inbound message in a nested entry/changes structure.
// We extract the sender phone + text, generate a reply, then send it back
// via the WhatsApp Business API using the existing sendWhatsApp utility.
router.post("/", async (req: Request, res: Response) => {
  // Always respond 200 immediately — Meta retries if it doesn't get a fast ack
  res.sendStatus(200);

  try {
    const body = req.body;

    if (body?.object !== "whatsapp_business_account") return;

    const entries: any[] = body?.entry ?? [];

    for (const entry of entries) {
      const changes: any[] = entry?.changes ?? [];

      for (const change of changes) {
        if (change?.field !== "messages") continue;

        const value    = change?.value ?? {};
        const messages: any[] = value?.messages ?? [];

        for (const msg of messages) {
          // Only handle inbound text messages for now
          if (msg?.type !== "text") continue;

          const from = msg?.from as string;           // e.g. "971501234567"
          const text = msg?.text?.body as string;

          if (!from || !text) continue;

          console.log(`[WhatsApp Webhook] Inbound from ${from}: "${text}"`);

          const reply = await buildReply(from, text);

          const result = await sendWhatsApp(from, reply);
          if (!result.success) {
            console.error(`[WhatsApp Webhook] Failed to send reply to ${from}:`, result.error);
          }
        }
      }
    }
  } catch (err) {
    console.error("[WhatsApp Webhook] Unhandled error:", err);
  }
});

export { router as whatsappWebhookRouter };
