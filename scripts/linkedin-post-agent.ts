import { chromium } from 'playwright';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * DeliWer LinkedIn Agent
 * Handles automated posting to the DeliWer LinkedIn Showcase page.
 */
async function postToLinkedIn(content: string) {
  const email = process.env.LINKEDIN_EMAIL;
  const password = process.env.LINKEDIN_PASSWORD;
  const showcasePageUrl = "https://www.linkedin.com/showcase/deliwer/";

  if (!email || !password) {
    console.error("Missing LINKEDIN_EMAIL or LINKEDIN_PASSWORD environment variables.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Logging into LinkedIn...");
    await page.goto('https://www.linkedin.com/login');
    await page.fill('#username', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForURL('**/feed/**');
    console.log("Login successful.");

    console.log(`Navigating to Showcase Page: ${showcasePageUrl}`);
    await page.goto(showcasePageUrl);

    // Click "Start a post"
    // Note: Selectors might need adjustment based on LinkedIn's actual DOM
    console.log("Opening post modal...");
    await page.click('button:has-text("Start a post")');
    
    console.log("Typing content...");
    await page.waitForSelector('div[role="textbox"]');
    await page.fill('div[role="textbox"]', content);

    console.log("Clicking Post...");
    await page.click('button:has-text("Post")');

    // Wait for the post to be processed
    await page.waitForTimeout(3000);
    console.log("Post submitted successfully!");

  } catch (error) {
    console.error("Error during LinkedIn posting:", error);
    // Capture screenshot for debugging if it fails
    await page.screenshot({ path: 'linkedin-error.png' });
  } finally {
    await browser.close();
  }
}

// Example usage
const postContent = `Relocating to Dubai? 🏙️ 

DeliWer handles the friction after the keys. Home setup, relocation support, fixes, disposal & daily living — handled by one team on WhatsApp.

Visit us: https://deliwer.com
#DubaiRelocation #DeliWer #SustainableLiving #DubaiRealEstate`;

// postToLinkedIn(postContent);
