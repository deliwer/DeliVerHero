import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Flame, MessageCircle, Send, CheckCircle2, Trophy, AlertCircle } from "lucide-react";
import { SiOpenai, SiFacebook } from "react-icons/si";

export default function FounderHQ() {
  const { toast } = useToast();
  const { data: streaks, isLoading } = useQuery<any[]>({
    queryKey: ["/api/founder-streaks"],
  });

  const postMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/founder-streaks/post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/founder-streaks"] });
      toast({
        title: "🔥 Streak Updated!",
        description: "Your daily founder ritual is complete. Keep building!",
      });
    },
  });

  const hassan = streaks?.find((s) => s.name === "Hassan Jawad");
  const rubab = streaks?.find((s) => s.name === "Rubab Hassan");

  const getRank = (days: number) => {
    if (days >= 365) return "Relentless";
    if (days >= 90) return "Machine";
    if (days >= 30) return "Operator";
    if (days >= 7) return "Builder";
    return "Newbie";
  };

  const getNextLevel = (days: number) => {
    if (days < 7) return 7;
    if (days < 30) return 30;
    if (days < 90) return 90;
    return 365;
  };

  const openChatGPT = () => {
    const prompt = encodeURIComponent(
      `Generate a short, powerful daily founder post for DeliWer in Dubai.\nFocus: sustainability, relocation, water systems, circular economy.\nTone: visionary but grounded.\nInclude website www.deliwer.com and 3 relevant hashtags.`
    );
    window.open(`https://chat.openai.com/?q=${prompt}`, "_blank");
  };

  const pushToWhatsApp = () => {
    const message = window.prompt("Paste your daily post here to push to WhatsApp:");
    if (message && hassan) {
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${hassan.phone}?text=${encoded}`, "_blank");
    }
  };

  const openMeta = () => {
    toast({
      title: "Opening Meta",
      description: "Redirecting to Meta Business Suite for FB/IG posting.",
    });
    window.open("https://business.facebook.com/", "_blank");
  };

  if (isLoading) return <div className="p-8 text-center">Loading Founder HQ...</div>;

  const today = new Date().toISOString().split("T")[0];
  const missedDay = hassan && hassan.lastPosted !== today;

  return (
    <div className="container mx-auto p-4 max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">DeliWer Founder Survival HQ</h1>
        <p className="text-muted-foreground italic">
          🔥 Morning WhatsApp first → Meta next → Streak & leaderboard check.
          Don't break the chain. This is your daily founder ritual.
        </p>
      </div>

      {missedDay && (
        <Card className="bg-orange-500 text-white border-none shadow-lg animate-pulse">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6" />
            <p className="font-bold text-lg">⚠️ You missed a day! Don't break the chain!</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={openChatGPT} className="h-16 text-lg gap-2 bg-[#10a37f] hover:bg-[#10a37f]/90" data-testid="button-chatgpt">
          <SiOpenai className="w-6 h-6" />
          ChatGPT
        </Button>
        <Button onClick={pushToWhatsApp} className="h-16 text-lg gap-2 bg-[#25D366] hover:bg-[#25D366]/90" data-testid="button-whatsapp">
          <MessageCircle className="w-6 h-6" />
          WhatsApp
        </Button>
        <Button onClick={openMeta} className="h-16 text-lg gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90" data-testid="button-meta">
          <SiFacebook className="w-6 h-6" />
          Meta Suite
        </Button>
        <Button 
          onClick={() => postMutation.mutate()} 
          disabled={postMutation.isPending || !missedDay}
          className="h-16 text-lg gap-2"
          variant={missedDay ? "default" : "secondary"}
          data-testid="button-mark-posted"
        >
          <CheckCircle2 className="w-6 h-6" />
          {missedDay ? "I Posted Today ✅" : "Already Posted ✨"}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Flame className="text-orange-500 w-6 h-6" />
            Founder Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-center">
          <div className="space-y-1">
            <p className="text-5xl font-bold">{hassan?.streak || 0}</p>
            <p className="text-xl font-medium text-orange-500 uppercase tracking-wider">
              Rank: {getRank(hassan?.streak || 0)}
            </p>
          </div>
          <div className="space-y-2">
            <Progress 
              value={((hassan?.streak || 0) / getNextLevel(hassan?.streak || 0)) * 100} 
              className="h-3"
            />
            <p className="text-sm text-muted-foreground">
              {getNextLevel(hassan?.streak || 0) - (hassan?.streak || 0)} days until next level
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-yellow-500 w-6 h-6" />
            🏆 Founder Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
            <span className="font-medium">Hassan Jawad</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{hassan?.streak || 0}</span>
              <span className="text-sm text-muted-foreground">Days</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
            <span className="font-medium">Rubab Hassan</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{rubab?.streak || 0}</span>
              <span className="text-sm text-muted-foreground">Days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
