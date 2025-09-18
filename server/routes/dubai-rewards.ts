import { Router } from "express";
import { storage } from "../storage";

const router = Router();

// Get all Dubai challenges
router.get("/challenges", async (req, res) => {
  try {
    const challenges = await storage.getDubaiChallenges();
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching Dubai challenges:", error);
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

// Get all Dubai rewards
router.get("/rewards", async (req, res) => {
  try {
    const rewards = await storage.getDubaiRewards();
    res.json(rewards);
  } catch (error) {
    console.error("Error fetching Dubai rewards:", error);
    res.status(500).json({ error: "Failed to fetch rewards" });
  }
});

// Join a Dubai challenge
router.post("/challenges/:challengeId/join", async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { heroId } = req.body;

    if (!heroId) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    const success = await storage.joinDubaiChallenge(challengeId, heroId);
    
    if (success) {
      res.json({ success: true, message: "Successfully joined challenge" });
    } else {
      res.status(400).json({ error: "Failed to join challenge" });
    }
  } catch (error) {
    console.error("Error joining Dubai challenge:", error);
    res.status(500).json({ error: "Failed to join challenge" });
  }
});

// Claim a Dubai reward
router.post("/rewards/:rewardId/claim", async (req, res) => {
  try {
    const { rewardId } = req.params;
    const { heroId } = req.body;

    if (!heroId) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    // Verify hero exists and check loyalty membership
    const hero = await storage.getHero(heroId);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    // Enforce AquaCafe Loyalty membership requirement for reward redemption
    if (!hero.isAquaCafeLoyaltyMember) {
      return res.status(403).json({ 
        error: "AquaCafe Loyalty membership required",
        message: "You must be an AquaCafe Loyalty member to claim rewards. Join our loyalty program to start redeeming your Planet Points!",
        loyaltyRequired: true
      });
    }

    const success = await storage.claimDubaiReward(rewardId, heroId);
    
    if (success) {
      res.json({ success: true, message: "Successfully claimed reward" });
    } else {
      res.status(400).json({ error: "Failed to claim reward" });
    }
  } catch (error) {
    console.error("Error claiming Dubai reward:", error);
    res.status(500).json({ error: "Failed to claim reward" });
  }
});

export default router;