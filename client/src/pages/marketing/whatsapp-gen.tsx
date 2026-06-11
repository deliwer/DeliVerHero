import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { MessageSquare, Copy, Check, ExternalLink, RefreshCw } from "lucide-react";

type BnosTemplate = { id: string; category: string; name: string; body: string; variables: string[]; };

const QUICK_NUMBERS = [
  { label: "Recruitment (+971 52 394 6311)", value: "971523946311" },
  { label: "Finance Activation (+971 52 390 6019)", value: "971523906019" },
];

function buildWaUrl(number: string, message: string) {
  const clean = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppGenPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<BnosTemplate | null>(null);
  const [recipientNumber, setRecipientNumber] = useState("971523946311");
  const [customNumber, setCustomNumber] = useState("");
  const [vars, setVars] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [mode, setMode] = useState<"template" | "free">("template");

  const { data: templates = [] } = useQuery<BnosTemplate[]>({ queryKey: ["/api/bnos/templates"] });

  useEffect(() => {
    const target = customNumber.trim() || recipientNumber;
    if (mode === "free") {
      setPreview(freeText);
      setWaUrl(freeText.trim() ? buildWaUrl(target, freeText) : "");
    } else if (selectedTemplate) {
      let body = selectedTemplate.body;
      (selectedTemplate.variables || []).forEach(v => {
        body = body.replace(new RegExp(`\\{${v}\\}`, "g"), vars[v] || `{${v}}`);
      });
      setPreview(body);
      setWaUrl(buildWaUrl(target, body));
    }
  }, [selectedTemplate, vars, recipientNumber, customNumber, freeText, mode]);

  const selectTemplate = (t: BnosTemplate) => {
    setSelectedTemplate(t);
    const initVars: Record<string, string> = {};
    (t.variables || []).forEach(v => initVars[v] = "");
    setVars(initVars);
  };

  const copyText = () => { navigator.clipboard.writeText(preview).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const copyUrl = () => { navigator.clipboard.writeText(waUrl).then(() => { setCopiedUrl(true); setTimeout(() => setCopiedUrl(false), 2000); }); };
  const reset = () => { setSelectedTemplate(null); setVars({}); setPreview(""); setWaUrl(""); setFreeText(""); };

  const groupedTemplates: Record<string, BnosTemplate[]> = {};
  templates.forEach(t => { if (!groupedTemplates[t.category]) groupedTemplates[t.category] = []; groupedTemplates[t.category].push(t); });

  const CAT_LABELS: Record<string,string> = { recruitment:"Recruitment", interview:"Interview", zoom_invite:"Zoom Invite", activation:"Activation", finance_intro:"Finance Intro", follow_up:"Follow Up", reactivation:"Reactivation", lead_distribution:"Lead Distribution" };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2"><MessageSquare className="w-6 h-6 text-green-400" /> WhatsApp Generator</h1>
          <p className="text-slate-400 text-sm mt-1">Generate prefilled WhatsApp links · No API · No auto-send · Human-controlled</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-emerald-900/15 border border-emerald-700/30 rounded-xl px-4 py-3 text-xs text-emerald-400/80">
          All links open WhatsApp with a pre-filled message. You must manually press Send. No messages are sent automatically.
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button onClick={() => setMode("template")} className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "template" ? "bg-green-700 text-white" : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"}`} data-testid="btn-mode-template">Use Template</button>
          <button onClick={() => setMode("free")} className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "free" ? "bg-green-700 text-white" : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"}`} data-testid="btn-mode-free">Free Text</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Config */}
          <div className="space-y-5">
            {/* Recipient */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="font-black text-slate-200 text-sm uppercase tracking-wider">1. Recipient Number</h2>
              <div className="space-y-2">
                {QUICK_NUMBERS.map(n => (
                  <button key={n.value} onClick={() => { setRecipientNumber(n.value); setCustomNumber(""); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm border transition-all ${recipientNumber === n.value && !customNumber ? "bg-green-900/30 border-green-700/50 text-green-300" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`}
                    data-testid={`btn-num-${n.value}`}>
                    <MessageSquare className="w-4 h-4" /> {n.label}
                  </button>
                ))}
                <div>
                  <input value={customNumber} onChange={e => setCustomNumber(e.target.value)} placeholder="Or enter custom number: 971XXXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 mt-2"
                    data-testid="input-custom-number" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="font-black text-slate-200 text-sm uppercase tracking-wider">2. Message</h2>

              {mode === "free" ? (
                <textarea value={freeText} onChange={e => setFreeText(e.target.value)} rows={8}
                  placeholder="Type your message here…"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none"
                  data-testid="textarea-free-text" />
              ) : (
                <>
                  <select onChange={e => { const t = templates.find(x => x.id === e.target.value); if (t) selectTemplate(t); }}
                    value={selectedTemplate?.id || ""}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                    data-testid="select-template">
                    <option value="">Select a template…</option>
                    {Object.entries(groupedTemplates).map(([cat, tpls]) => (
                      <optgroup key={cat} label={CAT_LABELS[cat] || cat}>
                        {tpls.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </optgroup>
                    ))}
                  </select>

                  {selectedTemplate && selectedTemplate.variables?.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Fill Variables</div>
                      {selectedTemplate.variables.map(v => (
                        <div key={v}>
                          <label className="text-xs text-amber-400/80 font-black mb-1 block">{"{" + v + "}"}</label>
                          <input value={vars[v] || ""} onChange={e => setVars(vv => ({ ...vv, [v]: e.target.value }))}
                            placeholder={`Enter ${v}…`}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                            data-testid={`input-var-${v}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right: Preview + Actions */}
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-slate-200 text-sm uppercase tracking-wider">3. Preview</h2>
                <button onClick={reset} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"><RefreshCw className="w-3.5 h-3.5" /> Reset</button>
              </div>
              {preview ? (
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">{preview}</div>
              ) : (
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center text-slate-600 text-sm">
                  Select a template or type a message to see a preview
                </div>
              )}
              {preview && (
                <button onClick={copyText} className={`flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl text-sm font-black border transition-all ${copied ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"}`} data-testid="btn-copy-message">
                  {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Message</>}
                </button>
              )}
            </div>

            {waUrl && (
              <div className="bg-slate-900 border border-green-700/30 rounded-xl p-5 space-y-4">
                <h2 className="font-black text-green-400 text-sm uppercase tracking-wider">4. Your WhatsApp Link</h2>
                <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 break-all font-mono max-h-20 overflow-y-auto">{waUrl}</div>
                <div className="flex gap-3">
                  <button onClick={copyUrl} className={`flex-1 flex items-center gap-2 justify-center px-4 py-3 rounded-xl text-sm font-black border transition-all ${copiedUrl ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"}`} data-testid="btn-copy-link">
                    {copiedUrl ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
                  </button>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-2 justify-center px-4 py-3 rounded-xl text-sm font-black bg-green-600 hover:bg-green-500 text-white transition-colors"
                    data-testid="btn-open-whatsapp">
                    <ExternalLink className="w-4 h-4" /> Open WhatsApp
                  </a>
                </div>
                <p className="text-xs text-slate-600 text-center">Opens WhatsApp. You must press Send manually.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
