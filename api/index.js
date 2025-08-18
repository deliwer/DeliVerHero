// Vercel serverless API handler for DeliWer - Shopify Hydrogen ready
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

    // Leaderboard endpoints - handle both patterns
    if (method === 'GET' && (path.startsWith('/api/heroes/leaderboard/') || path === '/api/heroes/leaderboard')) {
      let limit = 10;
      if (path.includes('/')) {
        const segments = path.split('/');
        limit = parseInt(segments[segments.length - 1]) || 10;
      }
      if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit) || 10;
      }
      
      const topHeroes = sampleHeroes
        .filter(hero => hero.isActive)
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
      
      return res.status(200).json(topHeroes);
    }

    // Heroes endpoint
    if (method === 'GET' && path === '/api/heroes') {
      return res.status(200).json(sampleHeroes.filter(hero => hero.isActive));
    }

    // Single hero endpoint
    if (method === 'GET' && path.startsWith('/api/heroes/') && !path.includes('leaderboard')) {
      const heroId = path.split('/').pop();
      const hero = sampleHeroes.find(h => h.id === heroId);
      
      if (!hero) {
        return res.status(404).json({ error: 'Hero not found' });
      }
      
      return res.status(200).json(hero);
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
      const bottlesPrevented = Math.floor(tradeValue / 0.5);
      const co2Saved = Math.floor(bottlesPrevented * 0.5);
      const points = 100 + Math.floor(tradeValue / 10);
      
      return res.status(200).json({
        tradeValue,
        bottlesPrevented,
        co2Saved,
        points,
        level: points >= 600 ? "Gold Hero" : points >= 300 ? "Silver Hero" : "Bronze Hero",
        phoneModel,
        condition
      });
    }

    // AI Chat endpoint
    if (method === 'POST' && path === '/api/ai-chat') {
      const { message } = req.body || {};
      
      // Fallback response for production (OpenAI requires API key)
      const fallbackResponse = {
        response: `Hi! I'm the DeliWer AI Concierge 🤖 I can help you calculate your iPhone trade-in value and start your hero journey. What iPhone model would you like to trade? Available models: iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15, iPhone 14 series, iPhone 13 series, iPhone 12 series, iPhone 11 series.`
      };
      
      return res.status(200).json(fallbackResponse);
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
        bottlesPrevented: Math.floor((heroData.tradeValue || 500) / 0.5),
        co2Saved: Math.floor(((heroData.tradeValue || 500) / 0.5) * 0.5),
        referralCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return res.status(201).json(newHero);
    }

    // Dubai challenges and rewards endpoints
    if (method === 'GET' && path === '/api/dubai/challenges') {
      const challenges = [
        {
          id: "water-month-challenge",
          title: "Water Conservation Month",
          description: "Save 1000 bottles this month",
          reward: "AED 500 voucher",
          progress: 0.67,
          participants: 156,
          endDate: "2025-02-28"
        }
      ];
      return res.status(200).json(challenges);
    }

    if (method === 'GET' && path === '/api/dubai/rewards') {
      const rewards = [
        {
          id: "gold-tier-reward",
          title: "Gold Hero Badge",
          description: "Exclusive Dubai sustainability champion recognition",
          pointsRequired: 1000,
          available: true
        }
      ];
      return res.status(200).json(rewards);
    }

    // Social challenges endpoints
    if (method === 'GET' && path === '/api/social-challenges') {
      const challenges = [
        {
          id: "water-save-challenge",
          creatorId: "founder-1",
          creatorName: "Khalid Al-Mansoori",
          creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid",
          title: "Save 500 Bottles in 7 Days",
          description: "Challenge your friends to prevent 500 plastic bottles from entering Dubai's environment this week!",
          challengeType: "bottles_prevented",
          targetValue: 500,
          duration: 7,
          pointsReward: 250,
          participantLimit: 50,
          currentParticipants: 23,
          completedParticipants: 8,
          shareCount: 45,
          isActive: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "co2-reduction-challenge",
          creatorId: "founder-2",
          creatorName: "Amira Bin Rashid",
          creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amira",
          title: "Reduce 100kg CO2 This Month",
          description: "Join the Dubai carbon footprint reduction challenge. Every trade and eco-action counts!",
          challengeType: "co2_saved",
          targetValue: 100,
          duration: 30,
          pointsReward: 500,
          participantLimit: 100,
          currentParticipants: 67,
          completedParticipants: 12,
          shareCount: 89,
          isActive: true,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "trade-value-challenge",
          creatorId: "founder-3",
          creatorName: "Omar Al-Zaabi",
          creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
          title: "AED 5000 Trade Value Challenge",
          description: "Let's see who can achieve the highest sustainable trade value this quarter!",
          challengeType: "trade_value",
          targetValue: 5000,
          duration: 90,
          pointsReward: 1000,
          participantLimit: 30,
          currentParticipants: 18,
          completedParticipants: 3,
          shareCount: 34,
          isActive: true,
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      return res.status(200).json(challenges);
    }

    // Create social challenge
    if (method === 'POST' && path === '/api/social-challenges') {
      const challengeData = req.body;
      const newChallenge = {
        id: randomUUID(),
        ...challengeData,
        currentParticipants: 0,
        completedParticipants: 0,
        shareCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + challengeData.duration * 24 * 60 * 60 * 1000).toISOString()
      };
      
      return res.status(201).json(newChallenge);
    }

    // Join challenge
    if (method === 'POST' && path.startsWith('/api/social-challenges/') && path.endsWith('/join')) {
      const challengeId = path.split('/')[3];
      
      const participation = {
        id: randomUUID(),
        challengeId,
        participantId: 'current-user-id', // Would come from auth
        status: 'active',
        currentProgress: 0,
        pointsEarned: 0,
        createdAt: new Date().toISOString()
      };
      
      return res.status(200).json(participation);
    }

    // Social shares endpoint
    if (method === 'POST' && path === '/api/social-shares') {
      const shareData = req.body;
      const newShare = {
        id: randomUUID(),
        ...shareData,
        sharerId: 'current-user-id', // Would come from auth
        timestamp: new Date().toISOString(),
        platform: shareData.platform || 'whatsapp',
        success: true
      };
      
      return res.status(200).json(newShare);
    }

    // Fallback for any other API requests
    return res.status(404).json({ 
      error: 'Endpoint not found', 
      message: 'The requested API endpoint does not exist.',
      availableEndpoints: [
        'GET /api/impact-stats',
        'GET /api/heroes/leaderboard/:limit',
        'GET /api/heroes',
        'POST /api/calculate-trade-value',
        'POST /api/ai-chat',
        'POST /api/heroes',
        'GET /api/dubai/challenges',
        'GET /api/dubai/rewards',
        'GET /api/social-challenges',
        'POST /api/social-challenges',
        'POST /api/social-shares'
      ]
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request.'
    });
  }
}