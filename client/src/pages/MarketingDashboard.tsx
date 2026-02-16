import { leadApplications, type LeadApplication } from "@shared/schema";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuBadge } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Instagram, MessageCircle, ArrowRight, Loader2, Radio, ExternalLink, Send } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function MarketingDashboard() {
  const { toast } = useToast();
  const [isTriggering, setIsTriggering] = useState(false);
  const { data: leads, isLoading } = useQuery<any[]>({
    queryKey: ["/api/leads"],
    refetchInterval: 5000, 
  });

  const triggerDailyFounderReminder = async () => {
    setIsTriggering(true);
    try {
      await apiRequest("GET", "/api/daily-founder-trigger");
      toast({
        title: "Success",
        description: "Founder outreach reminder triggered successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message || "Failed to trigger reminder",
      });
    } finally {
      setIsTriggering(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ id, stage }: { id: string, stage: string }) => {
      await apiRequest("PATCH", `/api/leads/${id}/requirements`, { 
        marketingStage: stage,
        nextAction: stage === "handshake" ? "Send WhatsApp Checklist" : "Complete conversion"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({ title: "Lead Updated", description: "Stage updated successfully." });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    intercepted: leads?.filter(l => (l as any).marketingStage === "intercepted").length || 0,
    handshake: leads?.filter(l => (l as any).marketingStage === "handshake").length || 0,
    redirected: leads?.filter(l => (l as any).marketingStage === "redirected").length || 0,
    closed: leads?.filter(l => (l as any).marketingStage === "closed").length || 0,
  };

  const handleWhatsAppRedirect = (lead: any) => {
    // Channelise through @vdeliwer style redirect
    const waLink = `https://wa.me/971523946311?text=Hi, I'm ${lead.instagramHandle || lead.firstName} from Instagram. I'm interested in relocating to Dubai!`;
    window.open(waLink, "_blank");
    mutation.mutate({ id: lead.id, stage: "redirected" });
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-950 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Radio className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Real-Time Intent Sniffer</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Listening to #dubairelocation & @vdeliwer
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Card className="bg-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-3 flex items-center gap-4">
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-emerald-400">Founder Trigger</p>
                <p className="text-[10px] text-muted-foreground">Manual WhatsApp reminder</p>
              </div>
              <Button 
                size="sm"
                variant="ghost"
                onClick={triggerDailyFounderReminder}
                disabled={isTriggering}
                className="h-8 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
              >
                {isTriggering ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="ml-2">Trigger</span>
              </Button>
            </CardContent>
          </Card>
          <Badge variant="outline" className="text-sm border-emerald-500/50 text-emerald-500">Live Feedback Enabled</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intercepted</CardTitle>
            <Instagram className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.intercepted}</div>
            <p className="text-xs text-muted-foreground">Intent Found</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Handshake</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.handshake}</div>
            <p className="text-xs text-muted-foreground">Active DMs</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redirected</CardTitle>
            <ArrowRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.redirected}</div>
            <p className="text-xs text-muted-foreground">WhatsApp Hits</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <Badge variant="default" className="h-4 w-4 rounded-full p-0 bg-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.closed}</div>
            <p className="text-xs text-muted-foreground">Orders</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            Live Listening Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads?.filter(l => (l as any).source === "instagram_sniff" || true).slice(0, 15).map((lead) => {
              const isEjari = lead.notes?.toLowerCase().includes("ejari");
              return (
                <div key={lead.id} className={`flex items-center justify-between p-4 border rounded-xl bg-slate-950/50 hover:bg-slate-800/50 transition-all group ${isEjari ? 'border-emerald-500/30' : 'border-white/5'}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-pink-400">@{lead.instagramHandle || lead.firstName}</span>
                      <Badge variant="outline" className={`text-[10px] uppercase ${isEjari ? 'border-emerald-500/50 text-emerald-500' : 'border-pink-500/30 text-pink-400'}`}>
                        {isEjari ? 'New Ejari Prospect' : 'Intent Detected'}
                      </Badge>
                    </div>
                    <p className="text-sm italic text-muted-foreground">{lead.notes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleWhatsAppRedirect(lead)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${isEjari ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isEjari ? 'Book Move-in Pack' : 'Channelise to WhatsApp'}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              );
            })}
            {leads?.filter(l => (l as any).source === "instagram_sniff").length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 opacity-20" />
                Listening for relocation intent in Dubai...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
