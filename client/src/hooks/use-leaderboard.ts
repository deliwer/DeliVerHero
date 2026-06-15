import { useQuery } from "@tanstack/react-query";
import type { Hero } from "@shared/schema";

export function useLeaderboard(limit: number = 10) {
  return useQuery<Hero[]>({
    queryKey: ["/api/heroes/leaderboard", limit],
  });
}
