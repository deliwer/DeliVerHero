import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer Facebook Page API Agent
 * Handles automated posting to the DeliWer Facebook Page.
 */
export async function postToFacebookPage(message: string, link?: string) {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!accessToken || !pageId || accessToken.includes('TOKEN') || pageId.includes('ID')) {
    console.error("Missing or invalid FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_PAGE_ID");
    return { success: false, error: "Missing or invalid API credentials" };
  }

  const url = `https://graph.facebook.com/v22.0/${pageId}/feed`;

  const body: any = {
    message: message,
    access_token: accessToken
  };

  if (link) {
    body.link = link;
  }

  try {
    console.log("Posting to Facebook Page...");
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Facebook API Error: ${response.status} ${JSON.stringify(data)}`);
    }

    console.log("Facebook post created successfully!", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("Error during Facebook API posting:", error.message);
    return { success: false, error: error.message };
  }
}

// Simple CLI runner
import { fileURLToPath } from 'url';

const isMainModule = () => {
  if (typeof process !== 'undefined' && process.argv[1]) {
    const scriptPath = fileURLToPath(import.meta.url);
    return process.argv[1] === scriptPath || process.argv[1].endsWith('facebook-post-api.ts');
  }
  return false;
};

if (isMainModule()) {
  const message = process.argv[2] || "🚀 Relocating to Dubai? DeliWer handles everything after the keys. Home setup, maintenance, and resident support — all on WhatsApp. 🏙️";
  const link = process.argv[3] || "https://deliwer.com/relocate";

  postToFacebookPage(message, link).then(res => {
    if (res.success) {
      console.log("Facebook Post Successful!");
    } else {
      console.error("Facebook Post Failed.");
      process.exit(1);
    }
  });
}
