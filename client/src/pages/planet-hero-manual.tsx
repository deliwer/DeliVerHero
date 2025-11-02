import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Users, 
  Coins, 
  Trophy, 
  Gift, 
  Share2,
  Shield,
  HelpCircle,
  Mail,
  ExternalLink,
  ChevronRight,
  Target,
  Award,
  Zap,
  CheckCircle
} from "lucide-react";
import { SEOMeta } from "@/components/seo-meta";
import { Link } from "wouter";

export default function PlanetHeroManual() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const tableOfContents = [
    { id: "introduction", title: "Introduction", icon: BookOpen },
    { id: "how-to-join", title: "How to Join", icon: Users },
    { id: "earning-methods", title: "Earning Methods", icon: Coins },
    { id: "mission-types", title: "Mission Types", icon: Trophy },
    { id: "redeeming-points", title: "Redeeming Points", icon: Gift },
    { id: "affiliate-program", title: "Affiliate Program", icon: Share2 },
    { id: "code-of-conduct", title: "Code of Conduct", icon: Shield },
    { id: "faqs", title: "FAQs", icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <SEOMeta 
        title="Planet Hero Manual - Complete Guide"
        description="Complete guide to the Planet Hero program. Learn how to join, earn rewards, complete missions, and make an environmental impact."
      />

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-hero-green-900/30 to-dubai-blue-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/50 px-6 py-2 text-lg" data-testid="badge-manual">
            <BookOpen className="w-5 h-5 mr-2 inline" />
            Official Guide
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Planet Hero Manual
            <span className="block text-hero-green-400 mt-2">Complete Guide</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about becoming a Planet Hero and making an impact while earning rewards.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="glass border-slate-600 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tableOfContents.map(({ id, title, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === id
                        ? "bg-hero-green-500/20 text-hero-green-400 border border-hero-green-500/50"
                        : "text-gray-400 hover:bg-slate-700/50 hover:text-white"
                    }`}
                    data-testid={`nav-${id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{title}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <Card className="glass border-hero-green-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-8 h-8 text-hero-green-500" />
                    <CardTitle className="text-white text-3xl">Introduction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Welcome to Planet Hero, Dubai's revolutionary sustainability program that rewards you for making environmentally conscious decisions. Our mission is simple: transform everyday actions into meaningful environmental impact while earning real rewards.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    As a Planet Hero, you'll join thousands of Dubai residents who are actively contributing to a greener future. Through our gamified mission system, you can:
                  </p>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                    <li>Complete sustainable missions and earn Planet Points</li>
                    <li>Trade old devices for cash and environmental credits</li>
                    <li>Refer friends and earn affiliate commissions</li>
                    <li>Redeem points for exclusive rewards and benefits</li>
                    <li>Track your real-world environmental impact</li>
                  </ul>
                  <div className="mt-6 p-4 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg">
                    <p className="text-hero-green-400 font-semibold">
                      💡 Quick Start: Create your account, complete your first mission, and start earning within minutes!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* How to Join */}
            <section id="how-to-join" className="scroll-mt-24">
              <Card className="glass border-dubai-blue-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8 text-dubai-blue-500" />
                    <CardTitle className="text-white text-3xl">How to Join</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-dubai-blue-500/10 border border-dubai-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-dubai-blue-500 text-white flex items-center justify-center font-bold text-xl">
                          1
                        </div>
                        <h3 className="text-white font-bold text-lg">Sign Up</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Visit deliwer.com/signup and create your free Planet Hero account using your email or social login.
                      </p>
                    </div>

                    <div className="p-4 bg-dubai-blue-500/10 border border-dubai-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-dubai-blue-500 text-white flex items-center justify-center font-bold text-xl">
                          2
                        </div>
                        <h3 className="text-white font-bold text-lg">Verify</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Verify your email address and complete your profile with basic information about yourself.
                      </p>
                    </div>

                    <div className="p-4 bg-dubai-blue-500/10 border border-dubai-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-dubai-blue-500 text-white flex items-center justify-center font-bold text-xl">
                          3
                        </div>
                        <h3 className="text-white font-bold text-lg">Browse Missions</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Explore available missions across water, energy, trade-in, and planet-saving categories.
                      </p>
                    </div>

                    <div className="p-4 bg-dubai-blue-500/10 border border-dubai-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-dubai-blue-500 text-white flex items-center justify-center font-bold text-xl">
                          4
                        </div>
                        <h3 className="text-white font-bold text-lg">Start Earning</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Accept your first mission, complete it, and start earning Planet Points and rewards immediately!
                      </p>
                    </div>
                  </div>

                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-dubai-blue-500 to-blue-600 hover:from-dubai-blue-600 hover:to-blue-700 font-bold text-lg py-6" data-testid="button-signup">
                      <Users className="w-5 h-5 mr-2" />
                      Create Your Account Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>

            {/* Earning Methods */}
            <section id="earning-methods" className="scroll-mt-24">
              <Card className="glass border-amber-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Coins className="w-8 h-8 text-amber-500" />
                    <CardTitle className="text-white text-3xl">Earning Methods</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem value="missions" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-hero-green-500" />
                          <span>Complete Missions (Primary Method)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        <p className="mb-3">
                          Missions are the core of Planet Hero. Complete sustainable actions like trading devices, conserving water, or reducing energy usage to earn points.
                        </p>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li>Beginner missions: 50-100 points</li>
                          <li>Intermediate missions: 150-300 points</li>
                          <li>Expert missions: 400-600 points</li>
                          <li>Legendary missions: 1000+ points + bonus rewards</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="referrals" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        <div className="flex items-center gap-3">
                          <Share2 className="w-5 h-5 text-purple-500" />
                          <span>Referral Commissions</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        <p className="mb-3">
                          Earn AED 100 for every friend who signs up using your referral code and completes their first mission.
                        </p>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <p className="font-semibold text-purple-400">
                            Unlimited earning potential - no caps on referrals!
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="streaks" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-amber-500" />
                          <span>Daily Streaks & Bonuses</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        <p className="mb-3">
                          Maintain daily activity streaks to earn bonus multipliers on all points earned.
                        </p>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li>7-day streak: +10% bonus</li>
                          <li>30-day streak: +25% bonus</li>
                          <li>90-day streak: +50% bonus + exclusive badge</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="challenges" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          <span>Community Challenges</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        <p className="mb-3">
                          Participate in time-limited community challenges for massive point bonuses and exclusive rewards.
                        </p>
                        <p className="text-yellow-400 font-semibold">
                          Example: "1 Million Bottles Challenge" - Help prevent 1 million plastic bottles by Ramadan 2026
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Mission Types */}
            <section id="mission-types" className="scroll-mt-24">
              <Card className="glass border-emerald-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-8 h-8 text-emerald-500" />
                    <CardTitle className="text-white text-3xl">Mission Types</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
                      <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Water Conservation
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Install water filters, reduce bottled water usage, track water savings. Earn 100-500 points per mission.
                      </p>
                    </div>

                    <div className="p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5">
                      <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Energy Efficiency
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Switch to LED bulbs, use smart thermostats, solar panels. Earn 150-600 points per mission.
                      </p>
                    </div>

                    <div className="p-4 border border-emerald-500/30 rounded-lg bg-emerald-500/5">
                      <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        Device Trade-Ins
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Trade old iPhones, tablets, electronics. Earn 200-1000 points + cash value of device.
                      </p>
                    </div>

                    <div className="p-4 border border-purple-500/30 rounded-lg bg-purple-500/5">
                      <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Planet Saving
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Community cleanups, tree planting, education. Earn 300-800 points + special badges.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Redeeming Points */}
            <section id="redeeming-points" className="scroll-mt-24">
              <Card className="glass border-hero-green-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Gift className="w-8 h-8 text-hero-green-500" />
                    <CardTitle className="text-white text-3xl">Redeeming Points</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Planet Points can be redeemed for a wide variety of rewards:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 not-prose mb-6">
                    <div className="p-4 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg text-center">
                      <Gift className="w-8 h-8 text-hero-green-500 mx-auto mb-2" />
                      <h5 className="text-white font-bold mb-1">Cash Rewards</h5>
                      <p className="text-gray-400 text-sm">Convert points to AED at favorable rates</p>
                    </div>
                    
                    <div className="p-4 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg text-center">
                      <Trophy className="w-8 h-8 text-hero-green-500 mx-auto mb-2" />
                      <h5 className="text-white font-bold mb-1">Eco Products</h5>
                      <p className="text-gray-400 text-sm">Water filters, solar panels, sustainable goods</p>
                    </div>
                    
                    <div className="p-4 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg text-center">
                      <Award className="w-8 h-8 text-hero-green-500 mx-auto mb-2" />
                      <h5 className="text-white font-bold mb-1">Experiences</h5>
                      <p className="text-gray-400 text-sm">Dubai attractions, dining vouchers, events</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg not-prose">
                    <p className="text-amber-400 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Minimum redemption: 500 points (AED 50 equivalent)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Affiliate Program */}
            <section id="affiliate-program" className="scroll-mt-24">
              <Card className="glass border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Share2 className="w-8 h-8 text-purple-500" />
                    <CardTitle className="text-white text-3xl">Affiliate Program</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    The Planet Hero Affiliate Program allows you to earn passive income by sharing the platform with your network.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-purple-400 font-bold mb-2">Commission Structure</h4>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• AED 100 per successful referral</li>
                        <li>• +20% bonus for 10+ referrals/month</li>
                        <li>• Unlimited earning potential</li>
                        <li>• Instant payment processing</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-purple-400 font-bold mb-2">How to Get Started</h4>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Get your unique referral code</li>
                        <li>• Share via social media or email</li>
                        <li>• Track referrals in real-time</li>
                        <li>• Withdraw earnings anytime</li>
                      </ul>
                    </div>
                  </div>

                  <Link href="/planet-hero-affiliates">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 font-bold text-lg py-6" data-testid="button-affiliate-program">
                      <Share2 className="w-5 h-5 mr-2" />
                      Join Affiliate Program
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>

            {/* Code of Conduct */}
            <section id="code-of-conduct" className="scroll-mt-24">
              <Card className="glass border-red-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-8 h-8 text-red-500" />
                    <CardTitle className="text-white text-3xl">Code of Conduct</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To maintain a fair and sustainable community, all Planet Heroes must adhere to these guidelines:
                  </p>
                  
                  <ul className="text-gray-300 space-y-2">
                    <li>✓ Complete missions authentically - no fake submissions</li>
                    <li>✓ Be honest about environmental impact data</li>
                    <li>✓ Respect referral program terms - no spam or misleading claims</li>
                    <li>✓ Support fellow Planet Heroes and the community</li>
                    <li>✓ Report bugs or issues to help improve the platform</li>
                    <li>✗ Do not create multiple accounts for bonus farming</li>
                    <li>✗ Do not manipulate mission completion data</li>
                    <li>✗ Do not engage in fraudulent referral activities</li>
                  </ul>

                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg not-prose mt-6">
                    <p className="text-red-400 font-semibold">
                      ⚠️ Violations may result in account suspension and forfeiture of earned rewards.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQs */}
            <section id="faqs" className="scroll-mt-24">
              <Card className="glass border-slate-600">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="w-8 h-8 text-blue-500" />
                    <CardTitle className="text-white text-3xl">Frequently Asked Questions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem value="faq1" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        How long does it take to earn my first reward?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        You can earn your first reward within minutes! Simply sign up, complete a beginner mission (like sharing your referral link or browsing eco-products), and you'll earn points immediately. Rewards can be redeemed once you reach 500 points.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq2" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        Are Planet Points the same as cash?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        Planet Points have real monetary value and can be converted to cash (AED) at redemption. However, they can also be used to unlock exclusive eco-products and experiences that may offer better value than direct cash conversion.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq3" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        Do Planet Points expire?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        No! Your Planet Points never expire as long as your account remains active. However, we recommend redeeming them periodically to enjoy rewards and support sustainable businesses.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq4" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        Can I refer friends from outside Dubai?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        Currently, Planet Hero is focused on Dubai residents. However, we're expanding to other Emirates and cities soon! Your friends can sign up now and will be notified when the program launches in their city.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq5" className="border border-slate-700 rounded-lg px-4 bg-slate-800/30">
                      <AccordionTrigger className="text-white hover:text-hero-green-400">
                        How is my environmental impact calculated?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pt-4">
                        We use industry-standard metrics and verified data sources to calculate your impact. For example, trading in an iPhone prevents approximately 50-100 plastic bottles equivalent in manufacturing waste. Water filter installations are calculated based on average Dubai household consumption vs. bottled water usage.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Contact Support */}
            <section className="scroll-mt-24">
              <Card className="glass border-hero-green-500/30 bg-gradient-to-br from-hero-green-900/10 to-emerald-900/10">
                <CardContent className="text-center py-12">
                  <Mail className="w-16 h-16 text-hero-green-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-white mb-4">
                    Need More Help?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Our support team is here to help you succeed as a Planet Hero.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white font-bold px-10 py-6 text-xl"
                        data-testid="button-contact-support"
                      >
                        <Mail className="w-6 h-6 mr-2" />
                        Contact Support
                      </Button>
                    </Link>
                    <Link href="/planet-hero">
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-dubai-blue-500 text-dubai-blue-400 hover:bg-dubai-blue-500/20 font-bold px-10 py-6 text-xl"
                        data-testid="button-back-home"
                      >
                        <ChevronRight className="w-6 h-6 mr-2" />
                        Back to Planet Hero Home
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
