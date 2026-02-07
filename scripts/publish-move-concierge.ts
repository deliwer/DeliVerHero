import { postToFacebookPage } from './facebook-post-api';
import { postToInstagram } from './instagram-agent';

async function publishMoveConciergePost() {
  const imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000";
  const caption = `📦 Stress-Free Moving with our Move Concierge Package! 📦

Relocating in Dubai? Let DeliWer handle the heavy lifting. Our Move Concierge package includes:
✅ Professional Packing & Unpacking
✅ Furniture Assembly
✅ Utility Setup
✅ Deep Cleaning

Everything managed via WhatsApp for your convenience. 🏙️

Plan your move: https://deliwer.com/relocate
#MoveConcierge #DubaiRelocation #DeliWer #SmartMoving #DubaiLife`;

  console.log("Publishing Move Concierge post to Facebook...");
  const fbResult = await postToFacebookPage(caption, "https://deliwer.com/relocate");
  console.log("Facebook result:", fbResult);

  console.log("Publishing Move Concierge post to Instagram...");
  const igResult = await postToInstagram(imageUrl, caption);
  console.log("Instagram result:", igResult);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  publishMoveConciergePost();
}

export { publishMoveConciergePost };
