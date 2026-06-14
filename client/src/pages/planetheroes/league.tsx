import { useEffect } from "react";
import { useLocation } from "wouter";

export default function PlanetHeroesLeagueRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation("/league"); }, []);
  return null;
}
