import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface DubaiChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  targetZone: string;
  pointsReward: number;
  rewardItem: string;
  timeLimit: number;
  participantLimit?: number;
  currentParticipants: number;
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export interface DubaiReward {
  id: string;
  title: string;
  description: string;
  category: string;
  partner: string;
  value: number;
  pointsCost: number;
  availableQuantity?: number;
  claimedQuantity: number;
  zoneRestriction?: string | null;
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export function useDubaiChallenges() {
  return useQuery<DubaiChallenge[]>({
    queryKey: ["/api/dubai/challenges"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useDubaiRewards() {
  return useQuery<DubaiReward[]>({
    queryKey: ["/api/dubai/rewards"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useJoinChallenge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ challengeId, heroId }: { challengeId: string; heroId: string }) => {
      const response = await fetch(`/api/dubai/challenges/${challengeId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroId }),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate challenges to get updated participant count
      queryClient.invalidateQueries({ queryKey: ["/api/dubai/challenges"] });
      queryClient.invalidateQueries({ queryKey: ["/api/heroes"] });
    },
  });
}

export function useClaimReward() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ rewardId, heroId }: { rewardId: string; heroId: string }) => {
      const response = await fetch(`/api/dubai/rewards/${rewardId}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroId }),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate rewards to get updated availability
      queryClient.invalidateQueries({ queryKey: ["/api/dubai/rewards"] });
      queryClient.invalidateQueries({ queryKey: ["/api/heroes"] });
    },
  });
}