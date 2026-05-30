import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneOff, MessageCircle, RefreshCw, Send, CheckCircle2, AlertCircle, Clock, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

type MissedCall = {
  id: string;
  callerPhone: string;
  calledNumber: string;
  callSid: string | null;
  replySent: boolean;
  replyMode: string;
  replyError: string | null;
  source: string;
  createdAt: string;
};

type ApiResponse = {
  calls: MissedCall[];
  stats: { total: number; sent: number; simulated: number; failed: number };
};

function modeColor(mode: string) {
  if (mode === "sent") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (mode === "simulated") return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

function modeIcon(mode: string) {
  if (mode === "sent") return <CheckCircle2 className="w-3 h-3" />;
  if (mode === "simulated") return <Clock className="w-3 h-3" />;
  return <AlertCircle className="w-3 h-3" />;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function MissedCallAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [testPhone, setTestPhone] = useState("");

  const { data, isLoading, refetch, isFetching } = useQuery<ApiResponse>({
    queryKey: ["/api/missed-calls"],
    refetchInterval: 15000,
  });

  const testMutation = useMutation({
    mutationFn: (phone: string) =>
      apiRequest("POST", "/api/missed-call/test", { phone }),
    onSuccess: async (res: any) => {
      const json = await res.json().catch(() => ({}));
      queryClient.invalidateQueries({ queryKey: ["/api/missed-calls"] });
      toast({
        title: json.replyMode === "sent" ? "WhatsApp sent ✅" : json.replyMode === "simulated" ? "Simulated (no token)" : "Send failed ❌",
        description: json.replyMode === "failed" ? json.replyError : `Reply dispatched to ${testPhone}`,
      });
    },
    onError: () => toast({ title: "Error", description: "Test trigger failed", variant: "destructive" }),
  });

  const stats = data?.stats;
  const calls = data?.calls ?? [];

  const WEBHOOK_URL = `${window.location.origin}/api/webhooks/missed-call`;

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <PhoneOff className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Automation</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">Missed Call Auto-Reply</h1>
          <p className="text-slate-400 text-sm">
            When a call to <span className="text-white font-bold">+971 52 394 6311</span> goes unanswered, a WhatsApp service menu is automatically sent to the caller.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Logged", value: stats?.total ?? 0, color: "text-white", icon: Phone },
            { label: "WA Sent (live)", value: stats?.sent ?? 0, color: "text-emerald-400", icon: CheckCircle2 },
            { label: "Simulated", value: stats?.simulated ?? 0, color: "text-amber-400", icon: Clock },
            { label: "Failed", value: stats?.failed ?? 0, color: "text-red-400", icon: AlertCircle },
          ].map((s) => (
            <Card key={s.label} className="bg-[#0D1424] border-[#1E293B] p-4">
              <s.icon className={`w-4 h-4 mb-2 ${s.color}`} />
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-0.5">{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Setup instructions */}
        <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/5 p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-black text-white text-sm">How to connect your phone number</span>
          </div>
          <ol className="space-y-2 text-[12px] text-slate-400 list-decimal list-inside">
            <li>Log in to your <span className="text-white font-bold">Twilio</span> account (or any telephony provider)</li>
            <li>Open the phone number <span className="text-white font-bold">+971523946311</span> settings</li>
            <li>Under <em>Call comes in</em> → set to <span className="text-white font-bold">Webhook</span> → HTTP POST</li>
            <li>
              Paste this URL:{" "}
              <code
                className="bg-[#0D1424] border border-[#1E293B] rounded px-2 py-0.5 text-cyan-300 cursor-pointer hover:bg-[#1a2540] transition-colors"
                data-testid="webhook-url"
                onClick={() => { navigator.clipboard.writeText(WEBHOOK_URL); toast({ title: "Copied!", description: WEBHOOK_URL }); }}
              >
                {WEBHOOK_URL}
              </code>
            </li>
            <li>Add <span className="text-white font-bold">WHATSAPP_TOKEN</span> and <span className="text-white font-bold">WHATSAPP_PHONE_NUMBER_ID</span> secrets to enable live sending (otherwise replies are simulated in logs)</li>
          </ol>
        </div>

        {/* Service menu preview */}
        <div className="rounded-2xl border border-[#1E293B] bg-[#0D1424] p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <SiWhatsapp className="w-4 h-4 text-emerald-400" />
            <span className="font-black text-white text-sm">Message sent to every missed caller</span>
          </div>
          <div className="bg-[#070B14] rounded-xl p-4 text-[12px] text-slate-300 leading-relaxed whitespace-pre-line font-mono border border-[#1E293B]">
{`Hi 👋 You just called DeliWer — Dubai's move-in & home concierge. We missed your call but we're here to help!

Reply with a number to get started:

1️⃣ Ejari & DEWA setup (new move-in)
2️⃣ Home maintenance & repairs
3️⃣ Cleaning (move-in / move-out / regular)
4️⃣ Water filter installation
5️⃣ Furniture disposal or moving
6️⃣ Something else

Or just describe what you need in a message. A team member will respond shortly 🙏

📞 +971 52 394 6311 | deliwer.com`}
          </div>
        </div>

        {/* Manual test */}
        <div className="rounded-2xl border border-[#1E293B] bg-[#0D1424] p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Send className="w-4 h-4 text-purple-400" />
            <span className="font-black text-white text-sm">Test the auto-reply</span>
          </div>
          <p className="text-[12px] text-slate-400 mb-4">Enter any phone number to simulate a missed call and trigger the WhatsApp reply.</p>
          <div className="flex gap-2">
            <Input
              placeholder="+971 5X XXX XXXX"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="bg-[#070B14] border-[#1E293B] text-white placeholder-slate-600 max-w-[240px]"
              data-testid="input-test-phone"
            />
            <Button
              onClick={() => { if (testPhone.trim()) testMutation.mutate(testPhone.trim()); }}
              disabled={!testPhone.trim() || testMutation.isPending}
              className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-xs gap-1.5"
              data-testid="button-test-send"
            >
              {testMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Send Test
            </Button>
          </div>
        </div>

        {/* Call log */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-white text-lg">Call Log</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="border-[#1E293B] text-slate-400 text-xs gap-1.5"
            data-testid="button-refresh-log"
          >
            <RefreshCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-[#0D1424] border border-[#1E293B] animate-pulse" />
            ))}
          </div>
        ) : calls.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <PhoneOff className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-bold text-sm">No missed calls logged yet</p>
            <p className="text-xs mt-1 opacity-70">Use the test tool above or connect your Twilio number to start capturing calls.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {calls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between bg-[#0D1424] border border-[#1E293B] rounded-xl px-4 py-3 gap-4"
                data-testid={`row-missed-call-${call.id}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#070B14] border border-[#1E293B] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm">{call.callerPhone}</div>
                    <div className="text-[10px] text-slate-500">
                      → {call.calledNumber} · {timeAgo(call.createdAt)}
                      {call.source === "manual" && " · manual test"}
                      {call.callSid && ` · ${call.callSid.slice(0, 16)}…`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${modeColor(call.replyMode)}`}>
                    {modeIcon(call.replyMode)}
                    {call.replyMode === "sent" ? "WA Sent" : call.replyMode === "simulated" ? "Simulated" : "Failed"}
                  </span>
                  {call.replyError && (
                    <span className="text-[9px] text-red-400 max-w-[140px] truncate" title={call.replyError}>
                      {call.replyError}
                    </span>
                  )}
                  <a
                    href={`https://wa.me/${call.callerPhone.replace(/^\+/, "")}?text=Hi%2C+this+is+DeliWer+%F0%9F%91%8B`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`btn-reply-${call.id}`}
                  >
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase px-2 py-1 h-auto gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Reply
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
