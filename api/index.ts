import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { storage } from '../server/storage';
import { insertHeroSchema, insertTradeInSchema, updateHeroSchema } from '../shared/schema';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "",
});

// Create Express app for serverless functions
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Hero routes
app.get("/api/heroes", async (req, res) => {
  try {
    const heroes = await storage.getAllHeroes();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
});

app.get("/api/heroes/leaderboard/:limit?", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit || req.query.limit as string) || 10;
    const topHeroes = await storage.getTopHeroes(limit);
    res.json(topHeroes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.get("/api/impact-stats", async (req, res) => {
  try {
    const stats = await storage.getImpactStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch impact stats" });
  }
});

app.post("/api/heroes", async (req, res) => {
  try {
    const validatedData = insertHeroSchema.parse(req.body);
    const hero = await storage.createHero(validatedData);
    res.json(hero);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid hero data" });
  }
});

app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!openai.apiKey) {
      return res.json({
        response: null,
        fallback: "I'm your AI concierge! I can help you calculate your iPhone trade-in value and guide you through the process. What iPhone model do you have?"
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system", 
          content: "You are DeliWer's AI Hero Concierge for Dubai's iPhone-to-water trade platform. Help users trade iPhones for premium water systems while earning environmental impact points. Be conversational, helpful, and focused on conversion. Always mention specific trade values, environmental impact, and gamification elements."
        },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    res.json({
      response: completion.choices[0]?.message?.content,
      fallback: "I'm here to help you turn your iPhone into environmental superpowers! What iPhone model do you want to trade?"
    });
  } catch (error) {
    res.json({
      response: null,
      fallback: "I'm temporarily unavailable, but I'll be back soon to help with your iPhone trade-in! 🤖"
    });
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}