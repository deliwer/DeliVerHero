import { useEffect } from "react";
import { useLocation } from "wouter";

export default function PartnersHowItWorks() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/transaction-support");
  }, [setLocation]);

  return null;
}
