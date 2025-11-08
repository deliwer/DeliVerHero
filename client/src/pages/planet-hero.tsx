import { useEffect } from "react";
import { useLocation } from "wouter";

export default function PlanetHero() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to /play page since Planet Hero is now integrated there
    setLocation("/play");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-dubai-gradient flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero-green-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to Play page...</p>
      </div>
    </div>
  );
}
