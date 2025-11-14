import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { loadAthlete } from "../api/athlete/athlete";
import type { Athlete } from "../models/athlete";
import { useAuth } from "react-oidc-context";

export const QUERY_TYPE = {
  ATHLETE_ME: "ATHLETE_ME",
} as const;

export function useLoadAthlete(): UseQueryResult<Athlete, Error> {
    const auth = useAuth();
    const token = auth.user?.access_token ?? "";

  return useQuery<Athlete, Error>({
    queryKey: [QUERY_TYPE.ATHLETE_ME],
    queryFn: () => loadAthlete(token),
  });
}