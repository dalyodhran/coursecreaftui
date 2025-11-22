import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { loadAthlete } from '../api/athlete/loadAthlete';
import type { Athlete } from '../models/athlete';
import { useAuth } from 'react-oidc-context';
import { QUERY_TYPE } from './ReactQuery';

export function useLoadAthlete(): UseQueryResult<Athlete, Error> {
    const auth = useAuth();
    const token = auth.user?.access_token ?? '';

    return useQuery<Athlete, Error>({
        queryKey: [QUERY_TYPE.ATHLETE_ME],
        queryFn: () => loadAthlete(token),
    });
}
