import { MissionsDashboard } from "@/components/missions-dashboard";

export default function Missions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-8">
        <MissionsDashboard />
      </div>
    </div>
  );
}