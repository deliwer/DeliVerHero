import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer Instagram API Agent
 * Handles automated posting and commenting for @vdeliwer.
 */
export async function postToInstagram(imageUrl: string, caption: string) {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const instagramId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !instagramId || accessToken.includes('TOKEN') || instagramId.includes('ID')) {
    console.warn("Using Demo Mode: Instagram credentials not configured");
    return { success: true, demo: true, message: "Demo: Instagram post logged but not sent" };
  }

  try {
    // 1. Create Media Container
    console.log("Creating Instagram media container...");
    const containerUrl = `https://graph.facebook.com/v22.0/${instagramId}/media`;
    const containerRes = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: caption,
        access_token: accessToken
      })
    });

    const containerData = await containerRes.json();
    if (!containerRes.ok) throw new Error(`Instagram Container Error: ${JSON.stringify(containerData)}`);

    const creationId = containerData.id;

    // 2. Wait for media to be ready (Instagram processing can take a few seconds)
    console.log("Waiting for media to be ready...");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 3. Publish Media
    console.log("Publishing Instagram post...");
    const publishUrl = `https://graph.facebook.com/v22.0/${instagramId}/media_publish`;
    const publishRes = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken
      })
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok) throw new Error(`Instagram Publish Error: ${JSON.stringify(publishData)}`);

    console.log("Instagram post created successfully!");
    return { success: true, data: publishData };
  } catch (error: any) {
    console.error("Error during Instagram posting:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Automated Commenting Agent
 * Listens for keywords and comments on relevant posts.
 */
export async function autoCommentOnInstagram(mediaId: string, message: string) {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!accessToken || accessToken.includes('TOKEN')) {
    console.warn("Using Demo Mode: Instagram credentials not configured");
    return { success: true, demo: true, message: `Demo: Instagram comment on ${mediaId} logged: ${message}` };
  }

  const url = `https://graph.facebook.com/v22.0/${mediaId}/comments`;

  try {
    console.log(`Commenting on Instagram media ${mediaId}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        access_token: accessToken
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`Instagram Comment Error: ${JSON.stringify(data)}`);

    return { success: true, data };
  } catch (error: any) {
    console.error("Error during Instagram commenting:", error.message);
    return { success: false, error: error.message };
  }
}

// Simple CLI runner
if (process.argv[1] && process.argv[1].endsWith('instagram-agent.ts')) {
  const action = process.argv[2];
  if (action === 'post') {
    const imageUrl = process.argv[3] || "https://deliwer.com/assets/images/relocate-hero.jpg";
    const caption = process.argv[4] || "🚀 Relocating to Dubai? DeliWer handles everything after the keys. Home setup, maintenance, and resident support — all on WhatsApp. 🏙️ #DubaiRelocation #DeliWer";
    postToInstagram(imageUrl, caption).then(res => console.log(res));
  } else if (action === 'comment') {
    const mediaId = process.argv[3];
    const message = process.argv[4] || "Moving to Dubai can be easy! We handle the home setup so you don't have to. Check out DeliWer Relocate. 🙌";
    if (!mediaId) console.error("Media ID required for commenting");
    else autoCommentOnInstagram(mediaId, message).then(res => console.log(res));
  }
}
