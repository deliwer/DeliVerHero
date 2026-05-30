import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, X, Send, Minimize2, Maximize2, Zap, MessageSquare, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";

type UserType = "importer" | "wholesaler" | "phone_flipper" | "reseller" | "broker" | "logistics_partner" | null;

interface Message {
  role: "agent" | "user";
  text: string;
  options?: string[];
  cta?: { label: string; href: string };
}

const QUICK_STARTERS = [
  "I want to source iPhones from Dubai",
  "I'm a broker looking to distribute",
  "I need logistics coordination",
  "How does membership work?",
];

const WHATSAPP_URL = "https://wa.me/971523906019";

export default function ChainTrackAIAgent() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Welcome to ChainTrack. I'm your sourcing intelligence agent. What best describes you?",
      options: ["I'm an importer / buyer", "I'm a broker / distributor", "I'm a logistics partner", "I'm a supplier / wholesaler"],
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/chaintrack/qualify", {
        message: text,
        sessionId,
        history: messages.map(m => ({ role: m.role, text: m.text })),
      });
      const data = await res.json();
      const agentMsg: Message = {
        role: "agent",
        text: data.reply,
        options: data.options,
        cta: data.cta,
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch {
      setMessages(prev => [...prev, {
        role: "agent",
        text: "Let me connect you directly with our sourcing team on WhatsApp.",
        cta: { label: "Chat on WhatsApp →", href: WHATSAPP_URL },
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]"
          >
            <div className="bg-[#080D1C] border border-cyan-500/25 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col" style={{ height: minimized ? "auto" : "520px" }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/10 border-b border-cyan-500/20">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white leading-tight">ChainTrack Agent</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-medium">Online · AI-powered</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setMinimized(m => !m)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {!minimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[88%] space-y-2`}>
                          <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-cyan-500 text-slate-950 font-medium rounded-br-sm"
                              : "bg-[#0D1424] border border-[#1E293B] text-slate-200 rounded-bl-sm"
                          }`}>
                            {msg.text}
                          </div>
                          {msg.options && (
                            <div className="space-y-1.5">
                              {msg.options.map((opt, j) => (
                                <button
                                  key={j}
                                  onClick={() => send(opt)}
                                  className="w-full text-left px-3 py-2 rounded-xl bg-[#0D1424] border border-cyan-500/20 hover:border-cyan-500/50 text-xs text-cyan-300 hover:text-cyan-200 transition-all flex items-center gap-2 group"
                                >
                                  <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                          {msg.cta && (
                            <a
                              href={msg.cta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                            >
                              <SiWhatsapp className="w-4 h-4" />
                              {msg.cta.label}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1">
                            {[0,1,2].map(i => (
                              <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick Starters */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                      {QUICK_STARTERS.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => send(q)}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-[#0D1424] border border-slate-700/50 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 py-3 border-t border-[#1E293B] bg-[#070B14]">
                    <form
                      onSubmit={e => { e.preventDefault(); send(input); }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-[#0D1424] border-[#1E293B] text-white text-sm placeholder:text-slate-500 focus-visible:ring-cyan-500/30"
                        disabled={loading}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || loading}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-[10px] text-slate-600 mt-1.5 text-center">
                      AI-powered · Connects to WhatsApp for follow-up
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <motion.button
        onClick={() => { setOpen(o => !o); setMinimized(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        whileTap={{ scale: 0.92 }}
        title="ChainTrack AI Agent"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#080D1C] animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
