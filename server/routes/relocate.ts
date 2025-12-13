import { Router } from "express";

const router = Router();

// In-memory storage for relocate members (can be migrated to database later)
let members: { id: number; name: string; email: string; tier: "circle" | "inner-ring" }[] = [];
let nextId = 1;

// Sample events data with tier-based access
const events = [
  { 
    id: 1, 
    name: "Dubai Investment Tour", 
    date: "2025-12-20", 
    description: "Exclusive property and business investment tour in Dubai",
    tiers: ["circle", "inner-ring"] 
  },
  { 
    id: 2, 
    name: "Founder Networking Dinner", 
    date: "2026-01-15", 
    description: "Private dinner with successful Dubai-based entrepreneurs",
    tiers: ["inner-ring"] 
  },
  { 
    id: 3, 
    name: "Soft-Landing Orientation", 
    date: "2026-02-05", 
    description: "Comprehensive orientation for new Dubai relocators",
    tiers: ["circle", "inner-ring"] 
  },
  { 
    id: 4, 
    name: "Golden Visa Masterclass", 
    date: "2026-02-20", 
    description: "Learn about UAE Golden Visa requirements and process",
    tiers: ["circle", "inner-ring"] 
  },
  { 
    id: 5, 
    name: "VIP Real Estate Preview", 
    date: "2026-03-10", 
    description: "First access to premium off-plan properties",
    tiers: ["inner-ring"] 
  },
];

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, tier } = req.body;
    
    if (!email || !tier) {
      return res.status(400).json({ error: "Email and tier are required" });
    }
    
    const member = members.find(m => m.email === email && m.tier === tier);
    
    if (!member) {
      return res.status(404).json({ error: "Member not found or wrong tier" });
    }
    
    res.json(member);
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, email, tier } = req.body;
    
    if (!name || !email || !tier) {
      return res.status(400).json({ error: "Name, email, and tier are required" });
    }
    
    // Check if email already registered
    const existing = members.find(m => m.email === email);
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const newMember = {
      id: nextId++,
      name,
      email,
      tier: tier as "circle" | "inner-ring",
    };
    
    members.push(newMember);
    
    res.json(newMember);
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

// Get events endpoint
router.get("/events", async (req, res) => {
  try {
    res.json(events);
  } catch (error: any) {
    console.error("Events fetch error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Get all members (admin)
router.get("/members", async (req, res) => {
  try {
    res.json(members);
  } catch (error: any) {
    console.error("Members fetch error:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

export default router;
