import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import "./instagram-sniffer";
import { whatsappAgent } from "./services/whatsapp-agent";
import { runDailyAutomation, runFollowUpAutomation } from "./services/broker-automation";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Schedule daily WhatsApp campaign
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
setInterval(() => {
  whatsappAgent.sendDailyReferralCampaign().catch(console.error);
}, TWENTY_FOUR_HOURS);

// Initial WhatsApp run with a slight delay to ensure server is ready
setTimeout(() => {
  whatsappAgent.sendDailyReferralCampaign().catch(console.error);
}, 10000);

// ── Broker Recruitment Automation (Cron-based) ────────────────────────────────

const SIX_HOURS = 6 * 60 * 60 * 1000;

// Daily cycle: fetch new brokers from RERA + email all new entries
setInterval(() => {
  runDailyAutomation().catch((err) => console.error('[CRON] Daily automation error:', err));
}, TWENTY_FOUR_HOURS);

// Every 6 hours: run follow-up engine
setInterval(() => {
  runFollowUpAutomation().catch((err) => console.error('[CRON] Follow-up automation error:', err));
}, SIX_HOURS);

// Initial follow-up run after 30s (so server is fully ready)
setTimeout(() => {
  runFollowUpAutomation().catch((err) => console.error('[CRON] Initial follow-up error:', err));
}, 30000);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
