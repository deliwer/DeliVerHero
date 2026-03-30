import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Bell, Users, Send, Zap, Clock, CheckCircle2, XCircle, AlertTriangle,
  Mail, ChevronRight, Loader2, BookOpen, TrendingUp
} from "lucide-react";

interface TipsSendLog {
  id: string;
  tipId: string;
  tipTitle: string;
  tipCategory: string;
  sentAt: string;
  recipientCount: number;
  successCount: number;
  failCount: number;
  type: string;
  subject: string;
}

interface Tip {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  body: string;
  emoji: string;
}

const ALERT_LEVELS = [
  { value: "NORMAL", label: "NORMAL", color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400", description: "All clear status update" },
  { value: "AMBER",  label: "AMBER",  color: "bg-amber-500/15 border-amber-500/40 text-amber-400", description: "Heightened caution advisory" },
  { value: "RED",    label: "RED",    color: "bg-red-500/15 border-red-500/40 text-red-400", description: "Immediate action required" },
  { value: "BLACK",  label: "BLACK",  color: "bg-red-900/30 border-red-600/60 text-red-300", description: "Execute exit plan now" },
];

export default function AdminAlerts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [alertLevel, setAlertLevel] = useState("AMBER");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedTipId, setSelectedTipId] = useState<string>("");

  const { data: stats, isLoading: statsLoading } = useQuery<{
    total: number; active: number; recentLogs: TipsSendLog[];
  }>({ queryKey: ["/api/tips/stats"] });

  const { data: tips = [], isLoading: tipsLoading } = useQuery<Tip[]>({
    queryKey: ["/api/tips/library"],
  });

  const { data: nextTip } = useQuery<Tip>({ queryKey: ["/api/tips/next"] });

  const sendTipMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/tips/send-now", { tipId: selectedTipId || undefined }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tips/stats"] });
      toast({ title: "Tips broadcast sent!", description: `${data.sent} delivered, ${data.failed} failed` });
    },
    onError: (err: any) => toast({ title: "Send failed", description: err.message, variant: "destructive" }),
  });

  const sendAlertMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/tips/alert", { alertLevel, message: alertMessage }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tips/stats"] });
      setAlertMessage("");
      toast({ title: `${alertLevel} alert sent!`, description: `${data.sent} subscribers notified` });
    },
    onError: (err: any) => toast({ title: "Alert failed", description: err.message, variant: "destructive" }),
  });

  const formatDate = (d: string) => new Date(d).toLocaleString("en-GB", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
  });

  const typeLabel = (type: string) => ({
    daily_tips: { label: "Daily Tip", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    emergency_alert: { label: "Alert", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  }[type] || { label: type, color: "bg-slate-700 text-slate-400 border-slate-600" });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Tips & Alerts Dashboard</h1>
          </div>
          <p className="text-slate-500 text-sm ml-13">Manage daily tips broadcasts and emergency alerts to subscribers</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Subscribers", value: statsLoading ? "—" : stats?.total ?? 0, icon: Users, color: "text-blue-400" },
            { label: "Active", value: statsLoading ? "—" : stats?.active ?? 0, icon: CheckCircle2, color: "text-emerald-400" },
            { label: "Tips in Library", value: tips.length || "—", icon: BookOpen, color: "text-amber-400" },
            { label: "Broadcasts Sent", value: statsLoading ? "—" : stats?.recentLogs?.length ?? 0, icon: TrendingUp, color: "text-purple-400", suffix: " recent" },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-slate-500 text-xs">{stat.label}</span>
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>
                {stat.value}{stat.suffix ?? ""}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Send Daily Tip */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Send className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-base">Send Daily Tip</h2>
            </div>

            {nextTip && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 mb-4">
                <div className="text-xs text-slate-500 mb-1">Today's scheduled tip</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{nextTip.emoji}</span>
                  <span className="text-sm font-semibold text-slate-200 line-clamp-1">{nextTip.title}</span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs text-slate-500 mb-2 block">Or select a specific tip</label>
              <select
                value={selectedTipId}
                onChange={e => setSelectedTipId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-blue-500"
                data-testid="select-tip-id"
              >
                <option value="">Use today's scheduled tip</option>
                {tips.map(tip => (
                  <option key={tip.id} value={tip.id}>{tip.emoji} {tip.title}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => sendTipMutation.mutate()}
              disabled={sendTipMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 font-bold"
              data-testid="button-send-tip"
            >
              {sendTipMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />Broadcast to {stats?.active ?? 0} Subscribers</>
              )}
            </Button>
          </div>

          {/* Send Emergency Alert */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-red-400" />
              <h2 className="font-bold text-base">Send Emergency Alert</h2>
            </div>

            <div className="mb-4">
              <label className="text-xs text-slate-500 mb-2 block">Alert Level</label>
              <div className="grid grid-cols-2 gap-2">
                {ALERT_LEVELS.map(level => (
                  <button
                    key={level.value}
                    onClick={() => setAlertLevel(level.value)}
                    className={`border rounded-lg p-2.5 text-left transition-all ${
                      alertLevel === level.value
                        ? level.color + " ring-1 ring-current"
                        : "border-slate-700 text-slate-500 hover:border-slate-600"
                    }`}
                    data-testid={`button-alert-level-${level.value.toLowerCase()}`}
                  >
                    <div className="font-bold text-sm">{level.label}</div>
                    <div className="text-xs opacity-70">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-slate-500 mb-2 block">Alert Message</label>
              <Textarea
                value={alertMessage}
                onChange={e => setAlertMessage(e.target.value)}
                placeholder="Enter the alert message to send to all subscribers..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 h-24 resize-none text-sm"
                data-testid="textarea-alert-message"
              />
            </div>

            <Button
              onClick={() => sendAlertMutation.mutate()}
              disabled={sendAlertMutation.isPending || !alertMessage.trim()}
              className="w-full bg-red-700 hover:bg-red-600 font-bold"
              data-testid="button-send-alert"
            >
              {sendAlertMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending Alert...</>
              ) : (
                <><AlertTriangle className="w-4 h-4 mr-2" />Send {alertLevel} Alert</>
              )}
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <h2 className="font-bold text-base">Recent Broadcasts</h2>
          </div>

          {statsLoading ? (
            <div className="p-8 text-center text-slate-600 text-sm">Loading...</div>
          ) : !stats?.recentLogs?.length ? (
            <div className="p-8 text-center">
              <Mail className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p className="text-slate-600 text-sm">No broadcasts yet. Send your first tip above!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {stats.recentLogs.map(log => {
                const type = typeLabel(log.type);
                const successRate = log.recipientCount > 0
                  ? Math.round((log.successCount / log.recipientCount) * 100)
                  : 0;
                return (
                  <div key={log.id} className="flex items-center gap-4 px-6 py-4" data-testid={`row-broadcast-${log.id}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs border font-semibold ${type.color}`}>{type.label}</span>
                        <span className="text-white text-sm font-semibold truncate">{log.tipTitle}</span>
                      </div>
                      <div className="text-slate-500 text-xs">{formatDate(log.sentAt)}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-white text-sm font-bold">{log.successCount}/{log.recipientCount}</div>
                      <div className={`text-xs ${successRate === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                        {successRate}% delivered
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tips Library Preview */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold text-base">Tips Library ({tips.length} tips)</h2>
            </div>
          </div>
          {tipsLoading ? (
            <div className="p-8 text-center text-slate-600 text-sm">Loading library...</div>
          ) : (
            <div className="divide-y divide-slate-800 max-h-80 overflow-y-auto">
              {tips.map(tip => (
                <div key={tip.id} className="flex items-center gap-3 px-6 py-3" data-testid={`row-tip-${tip.id}`}>
                  <span className="text-xl shrink-0">{tip.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{tip.title}</p>
                    <p className="text-xs text-slate-500">{tip.categoryLabel}</p>
                  </div>
                  <button
                    onClick={() => { setSelectedTipId(tip.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-blue-500 hover:text-blue-400 text-xs font-semibold flex items-center gap-1 shrink-0"
                    data-testid={`button-select-tip-${tip.id}`}
                  >
                    Select <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
