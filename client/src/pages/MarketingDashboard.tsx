import { leadApplications, type LeadApplication } from "@shared/schema";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuBadge } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Instagram, MessageCircle, ArrowRight, Loader2 } from "lucide-react";

export default function MarketingDashboard() {
  const { data: leads, isLoading } = useQuery<LeadApplication[]>({
    queryKey: ["/api/leads"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    intercepted: leads?.filter(l => l.marketingStage === "intercepted").length || 0,
    handshake: leads?.filter(l => l.marketingStage === "handshake").length || 0,
    redirected: leads?.filter(l => l.marketingStage === "redirected").length || 0,
    closed: leads?.filter(l => l.marketingStage === "closed").length || 0,
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Lead Engine</h1>
        <Badge variant="outline" className="text-sm">Dubai Expat Focus</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intercepted</CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.intercepted}</div>
            <p className="text-xs text-muted-foreground">New Instagram DMs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Handshake</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.handshake}</div>
            <p className="text-xs text-muted-foreground">Checklist Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redirected</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.redirected}</div>
            <p className="text-xs text-muted-foreground">Moved to WhatsApp</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <Badge variant="default" className="h-4 w-4 rounded-full p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.closed}</div>
            <p className="text-xs text-muted-foreground">First Orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads?.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">@{lead.instagramHandle || "anonymous"}</span>
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {lead.marketingStage}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.nextAction || "No action set"}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium">WhatsApp</p>
                    <p className="text-xs text-muted-foreground uppercase">{lead.whatsappStatus}</p>
                  </div>
                  <Badge variant={lead.orderStatus === "ordered" ? "default" : "outline"}>
                    {lead.orderStatus === "ordered" ? "Ordered" : "Pending Order"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
