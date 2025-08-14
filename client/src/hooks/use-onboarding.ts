import { useState, useEffect } from "react";

export function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('deliwer_onboarding_completed');
    setHasCompletedOnboarding(completed === 'true');
  }, []);

  const startOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem('deliwer_onboarding_completed', 'true');
    setHasCompletedOnboarding(true);
    setIsOnboardingOpen(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('deliwer_onboarding_completed');
    setHasCompletedOnboarding(false);
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  return {
    isOnboardingOpen,
    hasCompletedOnboarding,
    startOnboarding,
    completeOnboarding,
    resetOnboarding,
    closeOnboarding
  };
}