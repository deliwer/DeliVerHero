import { chromium } from 'playwright';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer LinkedIn Personal Account Agent
 * Handles automated posting to Hassan Jawad's personal LinkedIn account.
 */
export async function postToLinkedInPersonal(content: string) {
  const email = process.env.LINKEDIN_PERSONAL_EMAIL;
  const password = process.env.LINKEDIN_PERSONAL_PASSWORD;
  const profileUrl = "https://www.linkedin.com/in/formatix";

  if (!email || !password) {
    console.warn("Using Demo Mode: LinkedIn Personal credentials not configured");
    return { success: true, demo: true, message: "Demo: LinkedIn personal post logged but not sent" };
  }

  console.log("Launching browser for personal account...");
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

    try {
      await page.waitForURL('**/feed/**', { timeout: 15000 });
      console.log("Login successful.");
    } catch (e) {
      if (page.url().includes('checkpoint')) {
        throw new Error("LinkedIn security checkpoint encountered. Manual login required once to trust this device.");
      }
    }

    console.log("Opening post modal on home feed...");
    await page.goto("https://www.linkedin.com/feed/", { waitUntil: 'networkidle' });
    
    const startPostButton = page.locator('button:has-text("Start a post"), .share-box-feed-entry__trigger, button[aria-label*="Start a post"]');
    await startPostButton.first().click();
    
    console.log("Typing content...");
    const editor = page.locator('div[role="textbox"], .ql-editor');
    await editor.waitFor({ state: 'visible' });
    await editor.fill(content);

    console.log("Clicking Post...");
    const postButton = page.locator('button:has-text("Post"), .share-actions__primary-action');
    await postButton.click();

    await page.waitForTimeout(5000);
    console.log("LinkedIn Personal Post successful!");
    return { success: true };

  } catch (error: any) {
    console.error("Error during LinkedIn personal posting:", error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Simple CLI runner
if (process.argv[1].endsWith('linkedin-personal-agent.ts')) {
  const content = process.argv[2] || `Building the future of sustainable living in Dubai 🏙️

At DeliWer, we're simplifying the 'after-keys' experience for residents and investors. Everything from home setup to maintenance, managed on WhatsApp.

Join us: https://deliwer.com/relocate
#DeliWer #DubaiRelocation #Sustainability #Entrepreneurship`;

  postToLinkedInPersonal(content).then(res => {
    if (res.success) console.log("Done!");
    else process.exit(1);
  });
}
