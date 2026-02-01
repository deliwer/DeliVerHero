import { chromium } from 'playwright';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer LinkedIn Agent
 * Handles automated posting to the DeliWer LinkedIn Showcase page.
 */
export async function postToLinkedIn(content: string) {
  const email = process.env.LINKEDIN_EMAIL;
  const password = process.env.LINKEDIN_PASSWORD;
  const showcasePageUrl = "https://www.linkedin.com/showcase/deliwer/";

  if (!email || !password) {
    console.error("Missing LINKEDIN_EMAIL or LINKEDIN_PASSWORD environment variables.");
    return { success: false, error: "Missing credentials" };
  }

  console.log("Launching browser...");
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log("Logging into LinkedIn...");
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle' });
    await page.fill('#username', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    // Wait for feed or challenge
    try {
      await page.waitForURL('**/feed/**', { timeout: 15000 });
      console.log("Login successful.");
    } catch (e) {
      console.log("Login may require manual intervention (CAPTCHA/2FA) or different navigation.");
      if (page.url().includes('checkpoint')) {
        throw new Error("LinkedIn security checkpoint encountered. Manual login required once to trust this device.");
      }
    }

    console.log(`Navigating to Showcase Page: ${showcasePageUrl}`);
    await page.goto("https://www.linkedin.com/showcase/13178455/admin/page-posts/published/?share=true", { waitUntil: 'networkidle' });

    // Click "Start a post"
    console.log("Opening post modal...");
    const startPostButton = page.locator('button:has-text("Start a post"), .share-box-feed-entry__trigger, button[aria-label*="Start a post"]');
    await startPostButton.first().click();
    
    console.log("Typing content...");
    const editor = page.locator('div[role="textbox"], .ql-editor');
    await editor.waitFor({ state: 'visible' });
    await editor.fill(content);

    console.log("Clicking Post...");
    const postButton = page.locator('button:has-text("Post"), .share-actions__primary-action');
    await postButton.click();

    // Wait for success indicator or small delay
    await page.waitForTimeout(5000);
    console.log("Post submitted successfully!");
    return { success: true };

  } catch (error: any) {
    console.error("Error during LinkedIn posting:", error.message);
    await page.screenshot({ path: 'linkedin-error.png' });
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Simple CLI runner
import { fileURLToPath } from 'url';

const isMainModule = () => {
  if (typeof process !== 'undefined' && process.argv[1]) {
    const scriptPath = fileURLToPath(import.meta.url);
    return process.argv[1] === scriptPath || process.argv[1].endsWith('linkedin-post-agent.ts');
  }
  return false;
};

if (isMainModule()) {
  const content = process.argv[2] || `Relocating to Dubai? 🏙️ 

DeliWer handles the friction after the keys. Home setup, relocation support, fixes, disposal & daily living — handled by one team on WhatsApp.

Visit us: https://deliwer.com
#DubaiRelocation #DeliWer #SustainableLiving #DubaiRealEstate`;

  postToLinkedIn(content).then(res => {
    if (res.success) console.log("Done!");
    else process.exit(1);
  });
}
