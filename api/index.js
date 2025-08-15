// Simple serverless API handler for DeliWer
import { randomUUID } from "crypto";

// In-memory storage for serverless
let impactStats = {
  id: randomUUID(),
  totalBottlesPrevented: 847392,
  totalCo2Saved: 423700,
  totalRewards: 89200000,
  activeHeroes: 12847,
  updatedAt: new Date()
};

// Sample hero leaderboard data
const sampleHeroes = [
  {
    id: "founder-1",
    name: "Khalid Al-Mansoori",
    email: "khalid@deliwer.com",
    phoneModel: "iPhone 15 Pro Max",
    phoneCondition: "excellent",
    tradeValue: 1500,
    points: 8750,
    level: "Gold Hero",
    badges: ["Water Warrior", "Eco Champion", "Planet Founder", "Community Leader"],
    bottlesPrevented: 5247,
    co2Saved: 2623,
    referralCount: 23,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date()
  },
  {
    id: "founder-2",
    name: "Amira Bin Rashid",
    email: "amira@deliwer.com",
    phoneModel: "iPhone 15 Pro",
    phoneCondition: "excellent",
    tradeValue: 1400,
    points: 7890,
    level: "Gold Hero",
    badges: ["Water Guardian", "Eco Innovator", "Tech Pioneer"],
    bottlesPrevented: 4891,
    co2Saved: 2445,
    referralCount: 18,
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date()
  },
  {
    id: "founder-3",
    name: "Omar Al-Zaabi",
    email: "omar@deliwer.com",
    phoneModel: "iPhone 14 Pro Max",
    phoneCondition: "excellent",
    tradeValue: 1300,
    points: 7345,
    level: "Gold Hero",
    badges: ["Planet Protector", "Sustainability Expert", "Green Leader"],
    bottlesPrevented: 4156,
    co2Saved: 2078,
    referralCount: 15,
    isActive: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date()
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const path = url.split('?')[0];

  try {
    // Impact Stats endpoint
    if (method === 'GET' && path === '/api/impact-stats') {
      // Simulate live updates
      impactStats.totalBottlesPrevented += Math.floor(Math.random() * 5);
      impactStats.totalCo2Saved += Math.floor(Math.random() * 3);
      impactStats.activeHeroes += Math.floor(Math.random() * 2);
      impactStats.updatedAt = new Date();
      
      return res.status(200).json(impactStats);
    }

    // Leaderboard endpoint
    if (method === 'GET' && path.startsWith('/api/heroes/leaderboard/')) {
      const limit = parseInt(path.split('/').pop()) || 10;
      const topHeroes = sampleHeroes
        .filter(hero => hero.isActive)
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
      
      return res.status(200).json(topHeroes);
    }

    // Trade value calculation
    if (method === 'POST' && path === '/api/calculate-trade-value') {
      const { phoneModel, condition } = req.body || {};
      
      const baseValues = {
        "iPhone 15 Pro Max": 1500,
        "iPhone 15 Pro": 1400,
        "iPhone 15": 1200,
        "iPhone 14 Pro Max": 1300,
        "iPhone 14 Pro": 1200,
        "iPhone 14": 1000,
        "iPhone 13 Pro Max": 1100,
        "iPhone 13 Pro": 1000,
        "iPhone 13": 900,
        "iPhone 12 Pro Max": 900,
        "iPhone 12 Pro": 800,
        "iPhone 12": 700,
        "iPhone 11 Pro Max": 700,
        "iPhone 11 Pro": 600,
        "iPhone 11": 500
      };

      const conditionMultipliers = {
        "excellent": 1,
        "good": 0.85,
        "fair": 0.65,
        "poor": 0.4
      };

      const baseValue = baseValues[phoneModel] || 300;
      const multiplier = conditionMultipliers[condition] || 0.4;
      const tradeValue = Math.floor(baseValue * multiplier);
      
      return res.status(200).json({ tradeValue });
    }

    // Hero creation endpoint
    if (method === 'POST' && path === '/api/heroes') {
      const heroData = req.body;
      const newHero = {
        id: randomUUID(),
        ...heroData,
        points: 100,
        level: "Bronze Hero",
        badges: ["Water Warrior"],
        bottlesPrevented: Math.floor(heroData.tradeValue / 0.5),
        co2Saved: Math.floor((heroData.tradeValue / 0.5) * 0.5),
        referralCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return res.status(201).json(newHero);
    }

    // Default 404
    return res.status(404).json({ error: 'Not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}