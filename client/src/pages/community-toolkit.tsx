import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Copy, Check, MessageSquare, Mail, Share2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function CommunityToolkit() {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast({ title: "Copied", description: "Message copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  const messages = [
    {
      title: "WhatsApp Community Message",
      icon: MessageSquare,
      color: "bg-green-500/10 border-green-500/30",
      text: `Moving to Dubai soon? 🏠

Our community partner DeliWer activates your home before you arrive.

✓ Ejari guidance
✓ DEWA setup
✓ Water readiness
✓ Air readiness
✓ Move-in coordination

Book your AquaCafe Move-In Welcome Service (AED 399):
https://deliwer.com/start?ref=YOUR_PARTNER_NAME

Response within 10 minutes via WhatsApp.`
    },
    {
      title: "Email Newsletter Message",
      icon: Mail,
      color: "bg-blue-500/10 border-blue-500/30",
      text: `Subject: Don't Move Into Your Dubai Home Without Water 💧

Hi there,

Planning a move to Dubai? Don't spend your first night without water.

DeliWer's AquaCafe Move-In Welcome Service handles everything:
- Ejari registration coordination
- DEWA electricity activation
- Water connection verification
- AC & air quality check
- Full home readiness assessment

Book in minutes: https://deliwer.com/start?ref=YOUR_PARTNER_NAME

AED 399 • WhatsApp support • Response within 10 minutes

Let's make your move stress-free!`
    },
    {
      title: "LinkedIn Post",
      icon: Share2,
      color: "bg-blue-500/10 border-blue-500/30",
      text: `Moving to Dubai this week? 🇦🇪

One thing nobody tells you about settling into a new apartment in Dubai:

"It takes 3-5 days to get water connected if you navigate the system yourself."

But not with DeliWer's AquaCafe Move-In Welcome. We handle:
✓ Ejari guidance through RERA-appointed centers
✓ DEWA electricity activation
✓ Water connection coordination
✓ AC & air readiness verification
✓ Full home inspection before arrival

Price: AED 399
Time: Hours (not days)
Support: 24/7 via WhatsApp

Book Move-In Welcome Service: https://deliwer.com/start?ref=YOUR_PARTNER_NAME

#Dubai #Expat #MoveIn #Settlement`
    },
    {
      title: "Building Tenant Group Message",
      icon: MessageSquare,
      color: "bg-purple-500/10 border-purple-500/30",
      text: `Welcome to [Building Name] residents! 🏢

Moving in soon? Here's the move-in checklist:

☐ Ejari registration
☐ DEWA electricity
☐ Water activation
☐ AC & air filter check
☐ Facilities orientation

Let DeliWer handle the heavy lifting. They coordinate everything in one day.

Your building discount: Use code BUILDING_NAME for priority support

Book now: https://deliwer.com/start?ref=YOUR_PARTNER_NAME&building=BUILDING_NAME

Questions? Chat us on WhatsApp!`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Community Toolkit | Ready-to-Share Messages | DeliWer"
        description="Copy-paste templates for promoting DeliWer AquaCafe Move-In Welcome Service across WhatsApp, email, LinkedIn, and community groups."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-32 px-4 pt-32">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-black uppercase mb-4">
              Community Toolkit
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Ready-to-share templates for promoting DeliWer across all channels. Copy, paste, and start earning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Messages Section */}
      <section className="py-24 px-4 space-y-12">
        <div className="max-w-5xl mx-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`${msg.color} p-8 border rounded-2xl`}>
                <div className="flex items-start gap-4 mb-6">
                  <msg.icon className="w-6 h-6 flex-shrink-0" />
                  <h3 className="text-2xl font-black text-white">{msg.title}</h3>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-6 mb-6 border border-white/10">
                  <p className="text-gray-200 whitespace-pre-wrap font-medium leading-relaxed text-sm">
                    {msg.text}
                  </p>
                </div>

                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  onClick={() => copyText(msg.text, `msg-${i}`)}
                >
                  {copied === `msg-${i}` ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Message
                    </>
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">Pro Tips for Maximum Conversions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tip: "Personalize Your Link",
                desc: 'Replace "YOUR_PARTNER_NAME" with your actual name. Example: ?ref=debacci&agent=john',
                icon: "🔗"
              },
              {
                tip: "Share Where People Are Moving",
                desc: "Post in expat groups, relocation communities, LinkedIn, and WhatsApp building groups where new residents gather.",
                icon: "📍"
              },
              {
                tip: "Add Building Specifics",
                desc: 'Mention building names for higher relevance. Example: ?ref=debacci&building=marina-gate',
                icon: "🏢"
              },
              {
                tip: "Follow Up Regularly",
                desc: "Share the message weekly in your community groups. People searching for move-in solutions need reminders.",
                icon: "🔄"
              },
              {
                tip: "Include the Problem",
                desc: "Lead with the problem ('spending first night without water') before the solution. It hooks attention.",
                icon: "⚡"
              },
              {
                tip: "Track Your Performance",
                desc: "Monitor your partner dashboard at /marketing to see clicks, conversions, and earnings in real-time.",
                icon: "📊"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-white/10 rounded-xl p-6"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-black text-white mb-2">{item.tip}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-950/30 to-slate-950 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase mb-4">Ready to Start Earning?</h2>
            <p className="text-xl text-gray-300 mb-8">Copy these templates, generate your unique link, and start promoting to your community.</p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Generate Your Link
                </Button>
              </Link>
              <Link href="/partner-program">
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 font-black h-14 px-12 text-lg">
                  View Commission Details
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Earn 20% commission on every successful booking. No limits. Monthly payouts.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
