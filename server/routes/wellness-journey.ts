import { Router } from "express";
import { storage } from "../storage";
import { insertWellnessJourneySchema, insertWellnessJourneyStepSchema, insertAquaShowPerkSchema, insertLuxuryHotelPartnerSchema, insertRestaurantPartnerSchema, insertWellnessJourneyParticipantSchema } from "@shared/schema";

const router = Router();

// IMPORTANT: All static routes MUST come before parameterized routes to avoid conflicts

// Aqua Show Perks Management
// GET /api/wellness-journey/aqua-show-perks - Get all aqua show perks
router.get("/aqua-show-perks", async (req, res) => {
  try {
    const perks = await storage.getAquaShowPerks();
    res.json(perks);
  } catch (error) {
    console.error("Error fetching aqua show perks:", error);
    res.status(500).json({ error: "Failed to fetch aqua show perks" });
  }
});

// POST /api/wellness-journey/aqua-show-perks - Create a new aqua show perk
router.post("/aqua-show-perks", async (req, res) => {
  try {
    const validation = insertAquaShowPerkSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid perk data", details: validation.error.issues });
    }

    const perk = await storage.createAquaShowPerk(validation.data);
    res.status(201).json(perk);
  } catch (error) {
    console.error("Error creating aqua show perk:", error);
    res.status(500).json({ error: "Failed to create aqua show perk" });
  }
});

// Luxury Hotel Partners Management
// GET /api/wellness-journey/hotel-partners - Get all luxury hotel partners
router.get("/hotel-partners", async (req, res) => {
  try {
    const partners = await storage.getLuxuryHotelPartners();
    res.json(partners);
  } catch (error) {
    console.error("Error fetching hotel partners:", error);
    res.status(500).json({ error: "Failed to fetch hotel partners" });
  }
});

// POST /api/wellness-journey/hotel-partners - Create a new hotel partner
router.post("/hotel-partners", async (req, res) => {
  try {
    const validation = insertLuxuryHotelPartnerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid hotel partner data", details: validation.error.issues });
    }

    const partner = await storage.createLuxuryHotelPartner(validation.data);
    res.status(201).json(partner);
  } catch (error) {
    console.error("Error creating hotel partner:", error);
    res.status(500).json({ error: "Failed to create hotel partner" });
  }
});

// Restaurant Partners Management
// GET /api/wellness-journey/restaurant-partners - Get all restaurant partners
router.get("/restaurant-partners", async (req, res) => {
  try {
    const partners = await storage.getRestaurantPartners();
    res.json(partners);
  } catch (error) {
    console.error("Error fetching restaurant partners:", error);
    res.status(500).json({ error: "Failed to fetch restaurant partners" });
  }
});

// POST /api/wellness-journey/restaurant-partners - Create a new restaurant partner
router.post("/restaurant-partners", async (req, res) => {
  try {
    const validation = insertRestaurantPartnerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid restaurant partner data", details: validation.error.issues });
    }

    const partner = await storage.createRestaurantPartner(validation.data);
    res.status(201).json(partner);
  } catch (error) {
    console.error("Error creating restaurant partner:", error);
    res.status(500).json({ error: "Failed to create restaurant partner" });
  }
});

// Journey Steps Management
// POST /api/wellness-journey/steps - Create a new journey step
router.post("/steps", async (req, res) => {
  try {
    const validation = insertWellnessJourneyStepSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid step data", details: validation.error.issues });
    }

    const step = await storage.createWellnessJourneyStep(validation.data);
    res.status(201).json(step);
  } catch (error) {
    console.error("Error creating journey step:", error);
    res.status(500).json({ error: "Failed to create journey step" });
  }
});

// Wellness Journey Participants Management
// GET /api/wellness-journey/participants - Get participants by hero or journey
router.get("/participants", async (req, res) => {
  try {
    const { heroId, journeyId } = req.query;
    
    if (!heroId && !journeyId) {
      return res.status(400).json({ error: "Either heroId or journeyId is required" });
    }

    let participants;
    if (heroId) {
      participants = await storage.getParticipantsByHero(heroId as string);
    } else {
      participants = await storage.getParticipantsByJourney(journeyId as string);
    }

    res.json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});

// POST /api/wellness-journey/participants - Create a new participant
router.post("/participants", async (req, res) => {
  try {
    const validation = insertWellnessJourneyParticipantSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid participant data", details: validation.error.issues });
    }

    const participant = await storage.createWellnessJourneyParticipant(validation.data);
    res.status(201).json(participant);
  } catch (error) {
    console.error("Error creating participant:", error);
    res.status(500).json({ error: "Failed to create participant" });
  }
});

// PARAMETERIZED ROUTES SECTION - Must come after all static routes

// GET /api/wellness-journey - Get all wellness journeys for a hero
router.get("/", async (req, res) => {
  try {
    const { heroId } = req.query;
    
    if (!heroId) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    const journeys = await storage.getWellnessJourneysByHero(heroId as string);
    res.json(journeys);
  } catch (error) {
    console.error("Error fetching wellness journeys:", error);
    res.status(500).json({ error: "Failed to fetch wellness journeys" });
  }
});

// POST /api/wellness-journey - Create a new wellness journey
router.post("/", async (req, res) => {
  try {
    const validation = insertWellnessJourneySchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid journey data", details: validation.error.issues });
    }

    const journey = await storage.createWellnessJourney(validation.data);
    res.status(201).json(journey);
  } catch (error) {
    console.error("Error creating wellness journey:", error);
    res.status(500).json({ error: "Failed to create wellness journey" });
  }
});

// POST /api/wellness-journey/aqua-show-perks/:perkId/claim - Claim an aqua show perk
router.post("/aqua-show-perks/:perkId/claim", async (req, res) => {
  try {
    const { perkId } = req.params;
    const { heroId } = req.body;

    if (!heroId) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    // Verify hero exists and check loyalty membership
    const hero = await storage.getHero(heroId);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    // Enforce AquaCafe Loyalty membership requirement for perk claims
    if (!hero.isAquaCafeLoyaltyMember) {
      return res.status(403).json({ 
        error: "AquaCafe Loyalty membership required",
        message: "You must be an AquaCafe Loyalty member to claim wellness journey perks. Join our loyalty program to start your Dubai Wellness Journey!",
        loyaltyRequired: true
      });
    }

    const success = await storage.claimAquaShowPerk(perkId, heroId);
    
    if (success) {
      res.json({ success: true, message: "Successfully claimed aqua show perk" });
    } else {
      res.status(400).json({ error: "Failed to claim perk" });
    }
  } catch (error) {
    console.error("Error claiming aqua show perk:", error);
    res.status(500).json({ error: "Failed to claim perk" });
  }
});

// GET /api/wellness-journey/restaurant-partners/:restaurantId - Get restaurant by restaurant ID
router.get("/restaurant-partners/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const partner = await storage.getRestaurantPartnerByRestaurantId(restaurantId);
    
    if (!partner) {
      return res.status(404).json({ error: "Restaurant partner not found" });
    }

    res.json(partner);
  } catch (error) {
    console.error("Error fetching restaurant partner:", error);
    res.status(500).json({ error: "Failed to fetch restaurant partner" });
  }
});

// POST /api/wellness-journey/steps/:stepId/complete - Complete a specific step
router.post("/steps/:stepId/complete", async (req, res) => {
  try {
    const { stepId } = req.params;
    const step = await storage.completeJourneyStep(stepId);
    
    if (!step) {
      return res.status(404).json({ error: "Journey step not found" });
    }

    res.json(step);
  } catch (error) {
    console.error("Error completing step:", error);
    res.status(500).json({ error: "Failed to complete step" });
  }
});

// PUT /api/wellness-journey/participants/:id - Update participant progress
router.put("/participants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const participant = await storage.updateParticipantProgress(id, updates);
    
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json(participant);
  } catch (error) {
    console.error("Error updating participant:", error);
    res.status(500).json({ error: "Failed to update participant" });
  }
});

// GET /api/wellness-journey/:journeyId/steps - Get all steps for a journey
router.get("/:journeyId/steps", async (req, res) => {
  try {
    const { journeyId } = req.params;
    const steps = await storage.getWellnessJourneySteps(journeyId);
    res.json(steps);
  } catch (error) {
    console.error("Error fetching journey steps:", error);
    res.status(500).json({ error: "Failed to fetch journey steps" });
  }
});

// PUT /api/wellness-journey/:id/progress - Update journey progress
router.put("/:id/progress", async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (typeof progress !== "number" || progress < 0 || progress > 100) {
      return res.status(400).json({ error: "Progress must be a number between 0 and 100" });
    }

    const journey = await storage.updateWellnessJourneyProgress(id, progress);
    
    if (!journey) {
      return res.status(404).json({ error: "Wellness journey not found" });
    }

    res.json(journey);
  } catch (error) {
    console.error("Error updating journey progress:", error);
    res.status(500).json({ error: "Failed to update journey progress" });
  }
});

// POST /api/wellness-journey/:id/complete-step - Complete a journey step
router.post("/:id/complete-step", async (req, res) => {
  try {
    const { id } = req.params;
    const { stepNumber } = req.body;

    if (!stepNumber || typeof stepNumber !== "number") {
      return res.status(400).json({ error: "Step number is required" });
    }

    const journey = await storage.completeWellnessJourneyStep(id, stepNumber);
    
    if (!journey) {
      return res.status(404).json({ error: "Wellness journey not found" });
    }

    res.json(journey);
  } catch (error) {
    console.error("Error completing journey step:", error);
    res.status(500).json({ error: "Failed to complete journey step" });
  }
});

// GET /api/wellness-journey/:id - Get specific wellness journey
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await storage.getWellnessJourney(id);
    
    if (!journey) {
      return res.status(404).json({ error: "Wellness journey not found" });
    }

    res.json(journey);
  } catch (error) {
    console.error("Error fetching wellness journey:", error);
    res.status(500).json({ error: "Failed to fetch wellness journey" });
  }
});

export default router;