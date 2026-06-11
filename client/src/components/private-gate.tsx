import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Paths that have their own auth and must NOT be caught by the global gate
const PRIVATE_EXCLUSIONS = [
  "/admin/wsc",
  "/admin/reverse-auction",
  "/admin/mamzar",
  "/admin/broker-circle",
];

const PRIVATE_PREFIXES = [
  "/marketing",
  "/admin",
  "/operations",
  "/sendgrid-dashboard",
  "/capture-admin",
  "/habtoor-admin",
  "/investor-dashboard",
  "/mission-control-saqi-kawthar",
  "/corporate-dashboard",
  "/broker-master-db",
  "/email-campaigns",
  "/account-management",
  "/founder-dashboard",
  "/founder",
];

const TOKEN = "deliwer-admin-2026";
const SESSION_KEY = "dw_founder_auth";

function isPrivatePath(path: string) {
  if (PRIVATE_EXCLUSIONS.some((excl) => path === excl || path.startsWith(excl + "/"))) return false;
  return PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + "/"));
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (input.trim() === TOKEN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") attempt();
    if (error) setError(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#04060f]">
      <div
        className={`w-full max-w-sm px-8 py-10 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl flex flex-col items-center gap-6 transition-transform ${
          shake ? "animate-[shake_0.4s_ease]" : ""
        }`}
        style={shake ? { animation: "shake 0.4s ease" } : {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-white/20"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>

        <div className="text-center">
          <p className="text-white/60 text-xs font-black uppercase tracking-widest">
            Founder Access Only
          </p>
          <p className="text-white/20 text-[10px] mt-1 tracking-wider">
            This area is not public
          </p>
        </div>

        <div className="w-full space-y-3">
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            placeholder="Enter access token"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm font-mono placeholder:text-white/20 outline-none transition-colors focus:border-white/20 ${
              error ? "border-red-500/60 text-red-400" : "border-white/10"
            }`}
          />
          {error && (
            <p className="text-red-400/80 text-[10px] font-mono text-center">
              Invalid token — try again
            </p>
          )}
          <button
            onClick={attempt}
            className="w-full bg-white/8 hover:bg-white/12 border border-white/10 text-white/70 hover:text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all"
          >
            Unlock
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export function PrivateGate({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  if (!isPrivatePath(location)) return <>{children}</>;
  if (authed) return <>{children}</>;

  return (
    <>
      <LockScreen onUnlock={() => setAuthed(true)} />
    </>
  );
}
