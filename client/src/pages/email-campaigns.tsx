
import { EmailCampaignManager } from "@/components/email-campaign-manager";

export default function EmailCampaignsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <EmailCampaignManager />
      </div>
    </div>
  );
}
