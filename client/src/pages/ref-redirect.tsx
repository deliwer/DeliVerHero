import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { logEvent } from "@/lib/referral";

function setCookie(name: string, value: string, days = 30): void {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (_) {}
}

function storeRef(code: string): void {
  const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  try {
    localStorage.setItem("deliwer_ref", code);
    localStorage.setItem("deliwer_source", "/ref/" + code);
    localStorage.setItem("deliwer_session_id", sessionId);
    sessionStorage.setItem("deliwer_ref", code);
    sessionStorage.setItem("deliwer_source", "/ref/" + code);
    sessionStorage.setItem("deliwer_session_id", sessionId);
    setCookie("deliwer_ref", code);
    setCookie("deliwer_source", "/ref/" + code);
    setCookie("deliwer_session_id", sessionId);
  } catch (_) {}
}

export default function RefRedirectPage() {
  const params = useParams<{ code: string }>();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const code = params.code;
    if (code) {
      storeRef(code);
      logEvent({
        ref: code,
        page: `/ref/${code}`,
        timestamp: new Date().toISOString(),
        action: "page_visit",
      });
    }
    // Redirect to move-in with ref param so captureReferral() also fires
    const dest = code ? `/move-in?ref=${code}` : "/move-in";
    // Use replace to avoid back-button loop
    window.location.replace(dest);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Redirecting…</p>
      </div>
    </div>
  );
}
