import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Briefcase,
  Globe,
  Leaf,
  Users,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { contactInfo } from "@/lib/contact-info";

export default function AboutPage() {
  const team = [
    {
      name: "Hassan Jawad",
      title: "Founder & CEO",
      description:
        "Visionary leader driving DeliWer's mission to revolutionize sustainable shopping through gaming and environmental innovation.",
    },
    {
      name: "Rubab Hassan",
      title: "Co-Founder & Managing Director",
      description:
        "Strategic operator and business development expert ensuring DeliWer's growth and market expansion.",
    },
    {
      name: "Kalbe-Hussain Sheikh",
      title: "Customer Service Consultant",
      description:
        "Customer excellence champion dedicated to delivering exceptional support and building lasting relationships.",
    },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description:
        "Everything we do is designed to reduce environmental impact and promote eco-friendly practices.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "We believe in building a community of conscious consumers working together for positive change.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We combine gaming mechanics with real-world environmental action to create engaging solutions.",
    },
    {
      icon: Award,
      title: "Transparency",
      description:
        "We're committed to being open and honest about our impact and operations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            About DeliWer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're building the world's first shopping metaverse where sustainability
            meets gaming. Every action counts, every choice matters.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                To revolutionize sustainable living by creating an innovative
                shopping metaverse that gamifies environmental conservation.
                We empower users to earn Planet Points for water conservation
                and eco-friendly practices while reducing carbon emissions
                through our innovative circular exchange system.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                A world where sustainable choices are rewarding and engaging.
                Where old electronics become clean water solutions, where every
                purchase supports environmental conservation, and where gaming
                drives global positive impact.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card
                  key={idx}
                  className="bg-slate-800 border-slate-700 hover-elevate"
                >
                  <CardContent className="p-6 space-y-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-emerald-400 font-medium text-sm">
                      {member.title}
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recognition & Links */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Learn More About Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
                <TrendingUp className="w-10 h-10 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  Discover us on Crunchbase
                </h3>
                <p className="text-gray-300 text-sm">
                  View our company profile, funding information, and market insights.
                </p>
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <a
                    href={contactInfo.ctas.crunchbase}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Crunchbase
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
                <Briefcase className="w-10 h-10 text-amber-400" />
                <h3 className="text-xl font-bold text-white">
                  Connect with us on Gust
                </h3>
                <p className="text-gray-300 text-sm">
                  Explore investment opportunities and partnership possibilities.
                </p>
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <a
                    href={contactInfo.ctas.gust}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Gust
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Stats */}
        <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-700/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Making a Difference
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400 mb-2">
                  100K+
                </p>
                <p className="text-gray-300">Users Engaged</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400 mb-2">
                  50K+
                </p>
                <p className="text-gray-300">Eco-Friendly Exchanges</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400 mb-2">
                  25M+
                </p>
                <p className="text-gray-300">Liters of Water Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold text-white">
            Join Our Sustainability Movement
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Together, we're transforming how the world thinks about sustainability.
            Be part of the revolution—start earning Planet Points today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <a href="/">Get Started</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
