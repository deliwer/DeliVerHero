import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer LinkedIn API Agent
 * Handles automated posting to the DeliWer LinkedIn Showcase page via official API.
 */
export async function postToLinkedInAPI(content: string) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!accessToken || !organizationId) {
    console.error("Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_ORGANIZATION_ID environment variables.");
    return { success: false, error: "Missing API credentials" };
  }

  const url = 'https://api.linkedin.com/v2/ugcPosts';
  // Check if organizationId is a numeric ID and construct the correct URN
  const author = `urn:li:organization:${organizationId}`;

  console.log(`Using Author URN: ${author}`);

  const body = {
    author: author,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: content
        },
        shareMediaCategory: "NONE"
      }
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  try {
    console.log("Sending post to LinkedIn API...");
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`LinkedIn API Error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Post submitted successfully via API!", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("Error during LinkedIn API posting:", error.message);
    return { success: false, error: error.message };
  }
}

// Simple CLI runner
import { fileURLToPath } from 'url';

const isMainModule = () => {
  if (typeof process !== 'undefined' && process.argv[1]) {
    const scriptPath = fileURLToPath(import.meta.url);
    return process.argv[1] === scriptPath || process.argv[1].endsWith('linkedin-post-api.ts');
  }
  return false;
};

if (isMainModule()) {
  const content = process.argv[2] || `🚀 Relocating to Dubai just got easier! 🏙️

DeliWer handles everything after the keys. Home setup, maintenance, and resident support — all on WhatsApp. 

Visit us: https://deliwer.com/relocate
#DubaiRelocation #DeliWer #RelocateDubai #DubaiRealEstate #SustainableLiving`;

  postToLinkedInAPI(content).then(res => {
    if (res.success) {
      console.log("LinkedIn Post Successful!");
    } else {
      console.error("LinkedIn Post Failed.");
      process.exit(1);
    }
  });
}
