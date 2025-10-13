import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Droplets, 
  Users, 
  TreeDeciduous,
  Heart,
  Award,
  Share2,
  Globe,
  Youtube,
  Trophy,
  Zap,
  ArrowRight,
  CheckCircle,
  Building,
  Target
} from "lucide-react";
import { Link } from "wouter";

export default function MissionControlSaqiKawthar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950">
      {/* Hero Section - Climate Activist Message */}
      <div className="relative bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-b border-emerald-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Clean Water Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <Droplets className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              A Message for Clean Water - Before It's Too Late
            </h1>
            
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <p className="text-xl md:text-2xl text-green-100 mb-4 italic">
                "My name doesn't matter. What matters is that I am one of you—a member of the community who has witnessed the urgent need for clean water access and the devastating impact of water scarcity on our future."
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-red-900/40 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-red-300 mb-2">2.2B</div>
                  <div className="text-red-200">People lack access to safe water</div>
                </div>
                <div className="bg-orange-900/40 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-orange-300 mb-2">785M</div>
                  <div className="text-orange-200">Without basic drinking water services</div>
                </div>
                <div className="bg-blue-900/40 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-blue-300 mb-2">80%</div>
                  <div className="text-blue-200">Of wastewater flows back untreated</div>
                </div>
              </div>

              <p className="text-lg text-white font-semibold">
                But today, I'm not here to cry. I'm here to tell you: <span className="text-green-300">We are taking our future into our own hands.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Saqi Kawthar Partnership Banner */}
      <div className="bg-white/10 backdrop-blur-sm border-y border-white/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-sm text-green-200">Presented By</div>
                <div className="text-xl font-bold text-white">Saqi Kawthar Project</div>
              </div>
            </div>
            <div className="hidden md:block text-green-400 text-2xl">×</div>
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-sm text-emerald-200">Powered By</div>
                <div className="text-xl font-bold text-white">DeliWer Shopping Metaverse</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards - Primary CTAs */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Here's How You Start TODAY
          </h2>
          <p className="text-xl text-green-200">Every action counts. Every hero matters.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Become a Hero */}
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50 hover:border-green-400 transition-all cursor-pointer group" data-testid="card-become-hero">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Become a Hero</h3>
                <p className="text-green-200 text-sm mb-4">
                  Get your welcome bonus and start earning Planet Points
                </p>
                <Link href="/aquacafe">
                  <Button className="w-full bg-green-600 hover:bg-green-700" data-testid="button-join-aquacafe">
                    Join AquaCafe <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="text-xs text-green-300 mt-2">www.deliwer.com/aquacafe</div>
              </div>
            </CardContent>
          </Card>

          {/* Track Impact */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/50 hover:border-blue-400 transition-all cursor-pointer group" data-testid="card-track-impact">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Track Your Impact</h3>
                <p className="text-blue-200 text-sm mb-4">
                  See how you rank among our community's water champions
                </p>
                <Link href="/leaderboard">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-view-leaderboard">
                    View Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="text-xs text-blue-300 mt-2">www.deliwer.com/leaderboard</div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsor Mission */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 hover:border-purple-400 transition-all cursor-pointer group" data-testid="card-sponsor-mission">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Sponsor Mission</h3>
                <p className="text-purple-200 text-sm mb-4">
                  Corporate sponsors, this is your CSR legacy
                </p>
                <Link href="/partners">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-become-sponsor">
                    Become Partner <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="text-xs text-purple-300 mt-2">www.deliwer.com/partners</div>
              </div>
            </CardContent>
          </Card>

          {/* Get in Touch */}
          <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/50 hover:border-orange-400 transition-all cursor-pointer group" data-testid="card-contact">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get in Touch</h3>
                <p className="text-orange-200 text-sm mb-4">
                  Every question answered, every hand welcomed
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" data-testid="button-contact-us">
                    Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="text-xs text-orange-300 mt-2">www.deliwer.com/contact</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Framework */}
        <Card className="bg-slate-800/50 border-emerald-500/30 mb-16" data-testid="card-mission-framework">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              Saqi Kawthar Project Mission Framework
            </CardTitle>
            <p className="text-center text-green-200">Water for Life, Trees for Tomorrow</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-900/30 rounded-lg">
                <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Water Conservation</h3>
                <p className="text-blue-200 text-sm">
                  Workshops with AquaCafe and partners, promoting smart water use and behavioral change
                </p>
              </div>
              <div className="text-center p-6 bg-green-900/30 rounded-lg">
                <TreeDeciduous className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Tree Plantation</h3>
                <p className="text-green-200 text-sm">
                  Saqi Kawthar Green Weekends across local parks, schools, and community centers
                </p>
              </div>
              <div className="text-center p-6 bg-red-900/30 rounded-lg">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Community Water Support</h3>
                <p className="text-red-200 text-sm">
                  Mobilizing CSR partners and volunteers to raise funds and awareness for clean water access in affected communities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Empowering CSR Through Action
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platinum */}
            <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/50" data-testid="tier-platinum">
              <CardContent className="p-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">Platinum</h3>
                  <div className="text-3xl font-bold text-white mb-4">AED 10,000+</div>
                  <div className="space-y-2 text-yellow-100 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-400" />
                      <span>1,000 trees planted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-400" />
                      <span>100 water kits distributed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-400" />
                      <span>Prime logo placement</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gold */}
            <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-orange-500/50" data-testid="tier-gold">
              <CardContent className="p-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">Gold</h3>
                  <div className="text-3xl font-bold text-white mb-4">AED 5,000</div>
                  <div className="space-y-2 text-orange-100 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>500 trees planted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>Featured in campaigns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>Event recognition</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver */}
            <Card className="bg-gradient-to-br from-gray-700/40 to-slate-700/40 border-gray-400/50" data-testid="tier-silver">
              <CardContent className="p-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">Silver</h3>
                  <div className="text-3xl font-bold text-white mb-4">AED 2,500</div>
                  <div className="space-y-2 text-gray-200 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-300" />
                      <span>250 trees planted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-300" />
                      <span>Logo on leaderboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-300" />
                      <span>Quarterly reports</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bronze */}
            <Card className="bg-gradient-to-br from-amber-800/40 to-brown-800/40 border-amber-700/50" data-testid="tier-bronze">
              <CardContent className="p-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-amber-600 mb-2">Bronze</h3>
                  <div className="text-3xl font-bold text-white mb-4">AED 1,000</div>
                  <div className="space-y-2 text-amber-200 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      <span>100 trees planted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      <span>Social media shoutout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      <span>Community recognition</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* YouTube Integration */}
        <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/50 mb-16" data-testid="card-youtube-section">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-3">
              <Youtube className="w-8 h-8 text-red-400" />
              Upload Your Climate Action Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg text-red-100">
                Follow in the footsteps of global activists. Show the world what our community can do when we organize, when we act, when we refuse to let water scarcity define our future.
              </p>
              
              <div className="bg-black/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Upload to youtube.com/@vdeliwer</h3>
                <p className="text-red-200 mb-4">
                  Share your climate action story, tree planting initiative, or water conservation efforts
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="bg-red-900/50 px-3 py-1 rounded-full text-red-200 text-sm">#SaqiKawtharHero</span>
                  <span className="bg-red-900/50 px-3 py-1 rounded-full text-red-200 text-sm">#GreenFuture</span>
                  <span className="bg-red-900/50 px-3 py-1 rounded-full text-red-200 text-sm">#PlanetHeroMission</span>
                </div>
              </div>

              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Youtube className="w-20 h-20 text-red-400 mx-auto mb-4" />
                  <p className="text-white text-lg">Your climate action video will be featured here</p>
                  <p className="text-red-200 text-sm mt-2">and on the leaderboard</p>
                </div>
              </div>

              <Link href="/leaderboard">
                <Button className="bg-red-600 hover:bg-red-700 px-8 py-3" data-testid="button-upload-video">
                  <Youtube className="w-5 h-5 mr-2" />
                  Go to Leaderboard & Upload
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Timeline */}
        <Card className="bg-slate-800/50 border-green-500/30 mb-16" data-testid="card-timeline">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              From Launch to Legacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phase 1: Launch</h3>
                <p className="text-green-200 text-sm">
                  Campaign kickoff with community sign-ups and online registration on DeliWer's platform
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phase 2: Activation</h3>
                <p className="text-blue-200 text-sm">
                  Implementation of tree plantation drives, water awareness events, and CSR activations in local communities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phase 3: Recognition</h3>
                <p className="text-purple-200 text-sm">
                  Leaderboard awards ceremony celebrating top volunteers and sponsors with transparent impact reports
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Partnership Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/50" data-testid="card-pad-contact">
            <CardHeader>
              <CardTitle className="text-white">Saqi Kawthar Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6 text-green-400" />
                <a href="https://www.deliwer.com/saqi-kawthar" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200">
                  www.deliwer.com/saqi-kawthar
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-green-400" />
                <a href="mailto:community@deliwer.com" className="text-green-300 hover:text-green-200">
                  community@deliwer.com
                </a>
              </div>
              <p className="text-green-100 text-sm">
                Saqi Kawthar Project is dedicated to providing clean water access and promoting environmental sustainability through community engagement and awareness.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/50" data-testid="card-deliwer-contact">
            <CardHeader>
              <CardTitle className="text-white">DeliWer Shopping Metaverse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-emerald-400" />
                <Link href="/">
                  <span className="text-emerald-300 hover:text-emerald-200 cursor-pointer">
                    www.deliwer.com
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-emerald-400" />
                <a href="mailto:hello@deliwer.com" className="text-emerald-300 hover:text-emerald-200">
                  hello@deliwer.com
                </a>
              </div>
              <p className="text-emerald-100 text-sm">
                Founded by Rubab Hassan and Hassan Jawad, DeliWer transforms shopping into environmental action through gamification and Planet Points rewards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Final Call to Action */}
        <Card className="bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 border-green-500" data-testid="card-final-cta">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-white">
                The Time is NOW. Not Tomorrow. Not Next Year. NOW.
              </h2>
              <p className="text-xl text-green-100">
                Before the next flood. Before the next drought. Before it's too late.
              </p>
              <p className="text-2xl font-bold text-green-300">
                Together, we lead the change. For water. For trees. For our planet. For our future.
              </p>
              <div className="text-4xl font-bold text-white my-6">
                Clean Water for All 💧
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/aquacafe">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8" data-testid="button-start-now">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Mission Now
                  </Button>
                </Link>
                <Link href="/partners">
                  <Button size="lg" variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8" data-testid="button-become-partner">
                    <Building className="w-5 h-5 mr-2" />
                    Become a Partner
                  </Button>
                </Link>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <Button variant="ghost" className="text-green-300 hover:text-green-200" data-testid="button-share">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share This Mission
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
