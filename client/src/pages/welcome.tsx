import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";

export default function Welcome() {
  const [search] = useState(window.location.search);
  const [refName, setRefName] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string>("general");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const ref = params.get("ref");
    const utmCampaign = params.get("utm_campaign") || "general";
    
    if (ref) {
      setRefName(ref.replace(/_/g, " "));
      setCampaign(utmCampaign);
    }
  }, [search]);

  const whatsappMessage = refName 
    ? `Hi DeliWer, I was referred by ${refName.toUpperCase()} for ${campaign.toUpperCase()} support.`
    : "Hi DeliWer, I'm interested in your services.";
    
  const whatsappUrl = `https://wa.me/971523946311?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Welcome to Dubai | DeliWer Relocation"
        description="Your professional move-in partner in Dubai. We handle Ejari, DEWA, and everything else."
      />

      {/* Micro Trust Line - Added for uniformity */}
      <Navigation />

      <div className="container mx-auto px-4 pt-20 pb-12 max-w-2xl text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to DeliWer</h1>
            <p className="text-xl text-muted-foreground">Your premium gateway to Dubai living and sustainable retail.</p>
          </div>

          {refName && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-lg font-medium">
                  You were referred by <span className="text-primary capitalize">{refName}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col items-center gap-6 py-8">
            <p className="text-lg">Connect with our team on WhatsApp to get started with your {campaign} support.</p>
            <Button 
              asChild 
              size="lg" 
              className="h-12 px-8 text-lg gap-2"
              id="wa-button"
              data-testid="button-whatsapp-contact"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="h-5 w-5" />
                Contact on WhatsApp
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Post-Closing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">From Ejari to move-in essentials, we handle everything after your property deal.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sustainable Living</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Eco-friendly starter baskets and home essentials curated for the conscious expat.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
