import { Router } from "express";
import { storage } from "../storage";
import { sendBulkEmail } from "../sendgrid-service";

const router = Router();

// Get Dubai Marathon water stations and partner support locations
router.get("/water-stations", async (req, res) => {
  try {
    // Mock water station data along Sheikh Zayed Road marathon route
    const waterStations = [
      {
        id: "station-1",
        name: "AquaCafe Hydration Zone 1",
        location: "Sheikh Zayed Road - KM 5",
        coordinates: { lat: 25.2048, lng: 55.2708 },
        services: ["Filtered water", "Planet Points tracking", "Hero support team"],
        operatingHours: "06:00 - 10:00",
        partnerContact: "support@aquacafe.ae"
      },
      {
        id: "station-2", 
        name: "AquaCafe Hydration Zone 2",
        location: "Sheikh Zayed Road - KM 15",
        coordinates: { lat: 25.1969, lng: 55.2618 },
        services: ["Filtered water", "Energy monitoring", "Medical support"],
        operatingHours: "06:00 - 11:00", 
        partnerContact: "support@aquacafe.ae"
      },
      {
        id: "station-3",
        name: "AquaCafe Hydration Zone 3", 
        location: "Sheikh Zayed Road - KM 25",
        coordinates: { lat: 25.1889, lng: 55.2528 },
        services: ["Filtered water", "Recovery zone", "Celebration point"],
        operatingHours: "06:00 - 12:00",
        partnerContact: "support@aquacafe.ae"
      }
    ];
    
    res.json({
      success: true,
      count: waterStations.length,
      stations: waterStations
    });
  } catch (error) {
    console.error("Error fetching water stations:", error);
    res.status(500).json({ error: "Failed to fetch water stations" });
  }
});

// Register for marathon with partner support
router.post("/register", async (req, res) => {
  try {
    const { heroId, runnerName, email, phone, emergencyContact, expectedFinishTime } = req.body;
    
    if (!heroId || !runnerName || !email) {
      return res.status(400).json({ error: "Hero ID, runner name, and email are required" });
    }

    // Verify hero exists
    const hero = await storage.getHero(heroId);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    // Check if hero has enough points for registration
    const registrationReward = await storage.getDubaiReward("reward-marathon-registration");
    if (registrationReward && hero.points < registrationReward.pointsCost) {
      return res.status(400).json({ 
        error: "Insufficient points for marathon registration",
        required: registrationReward.pointsCost,
        available: hero.points
      });
    }

    // Mock registration data
    const registration = {
      id: `marathon-reg-${Date.now()}`,
      heroId,
      runnerName,
      email,
      phone,
      emergencyContact,
      expectedFinishTime,
      registrationDate: new Date(),
      status: "confirmed",
      bib: Math.floor(Math.random() * 9000) + 1000, // Random bib number
      category: "Planet Hero Ambassador",
      benefits: [
        "Exclusive Planet Hero T-shirt",
        "Priority water station access", 
        "Post-race wellness voucher",
        "Community recognition"
      ]
    };

    // Award bonus points for registration
    await storage.updateHero(heroId, { 
      points: hero.points + 500,
      badges: [...(hero.badges || []), "Marathon Registered"]
    });

    res.json({
      success: true,
      message: "Successfully registered for Dubai Marathon as Planet Hero",
      registration,
      pointsAwarded: 500
    });
  } catch (error) {
    console.error("Error processing marathon registration:", error);
    res.status(500).json({ error: "Failed to process registration" });
  }
});

// Distribute vouchers to marathon participants
router.post("/distribute-vouchers", async (req, res) => {
  try {
    const { participantEmails, voucherType = "wellness", voucherValue = 20000 } = req.body; // AED 200 default
    
    if (!participantEmails || !Array.isArray(participantEmails)) {
      return res.status(400).json({ error: "Participant emails array is required" });
    }

    const vouchers = participantEmails.map(email => ({
      id: `voucher-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      type: voucherType,
      value: voucherValue,
      code: `MARATHON${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days validity
      isRedeemed: false,
      eventType: "dubai-marathon-2024"
    }));

    // Send voucher emails to participants
    const emailPromises = vouchers.map(voucher => 
      sendBulkEmail([voucher.email], {
        from: "noreply@aquacafe.ae",
        subject: "🏃‍♂️ Your Dubai Marathon Planet Hero Voucher is Here!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px;">
            <h1 style="text-align: center; color: white; margin-bottom: 20px;">🎉 Congratulations, Planet Hero!</h1>
            <p style="font-size: 18px; line-height: 1.6;">
              Thank you for participating in the Dubai Marathon as an AquaCafe Planet Hero ambassador! 
              Your commitment to wellness and sustainability inspires our community.
            </p>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
              <h2 style="color: #FFF; margin: 0 0 10px 0;">Your Voucher Details</h2>
              <p style="font-size: 24px; font-weight: bold; color: #FFD700; margin: 10px 0;">Code: ${voucher.code}</p>
              <p style="font-size: 20px; color: #FFF;">Value: AED ${(voucher.value / 100).toFixed(2)}</p>
              <p style="color: #FFF;">Valid until: ${voucher.expiresAt.toLocaleDateString()}</p>
            </div>
            <p style="font-size: 16px; text-align: center;">
              Redeem at participating AquaCafe wellness partners or through our mobile app.
            </p>
            <div style="text-align: center; margin-top: 25px;">
              <a href="https://aquacafe.ae/redeem" style="background: #FFD700; color: #333; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Redeem Now
              </a>
            </div>
          </div>
        `
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const failureCount = results.length - successCount;

    res.json({
      success: true,
      message: `Distributed ${vouchers.length} vouchers to marathon participants`,
      vouchers: vouchers,
      emailResults: {
        sent: successCount,
        failed: failureCount,
        total: vouchers.length
      }
    });
  } catch (error) {
    console.error("Error distributing marathon vouchers:", error);
    res.status(500).json({ error: "Failed to distribute vouchers" });
  }
});

// Get partner giveaways and support items
router.get("/partner-giveaways", async (req, res) => {
  try {
    const giveaways = [
      {
        id: "giveaway-tshirts",
        item: "Planet Hero Marathon T-Shirts", 
        partner: "AquaCafe x Dubai Sports Council",
        quantity: 200,
        distributed: 12,
        location: "Registration tent & finish line",
        description: "High-performance moisture-wicking fabric with sustainability messaging"
      },
      {
        id: "giveaway-water-bottles",
        item: "Branded Reusable Water Bottles",
        partner: "AquaCafe Community Partners", 
        quantity: 500,
        distributed: 45,
        location: "All water stations",
        description: "BPA-free bottles promoting plastic reduction message"
      },
      {
        id: "giveaway-energy-bars",
        item: "Organic Energy Bars",
        partner: "Local Wellness Partners",
        quantity: 1000, 
        distributed: 120,
        location: "KM 15 & 25 stations",
        description: "Sustainably sourced energy bars for marathon runners"
      },
      {
        id: "giveaway-recovery-kits",
        item: "Post-Race Recovery Kits",
        partner: "Dubai Wellness Alliance",
        quantity: 100,
        distributed: 8,
        location: "VIP finish area",
        description: "Wellness items including massage vouchers and recovery supplements"
      }
    ];

    res.json({
      success: true,
      giveaways: giveaways,
      totalValue: "AED 75,000 in partner support",
      participationBenefits: [
        "Sustainable impact tracking",
        "Community recognition", 
        "Partner network access",
        "Wellness journey completion"
      ]
    });
  } catch (error) {
    console.error("Error fetching partner giveaways:", error);
    res.status(500).json({ error: "Failed to fetch partner giveaways" });
  }
});

export default router;