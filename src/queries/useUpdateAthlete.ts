import type { Athlete } from '../models/athlete';
import { useAuth } from 'react-oidc-context';
import { updateAthlete } from '../api/athlete/updateAthlete';
import { useMutation } from '@tanstack/react-query';

export function useUpdateAthlete() {
    const auth = useAuth();
    const token = auth.user?.access_token ?? '';

    return useMutation({
        mutationFn: ({
            athleteId,
            payload,
        }: {
            athleteId: string;
            payload: Partial<Athlete>;
        }) => updateAthlete(athleteId, token, payload),
    });
}
