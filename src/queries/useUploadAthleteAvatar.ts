import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { uploadAthleteAvatar } from '../api/athlete/uploadAthleteAvatar';

export function useUploadAthleteAvatar() {
    const auth = useAuth();
    const token = auth.user?.access_token ?? '';

    return useMutation({
        mutationFn: ({ athleteId, file }: { athleteId: string; file: File }) =>
            uploadAthleteAvatar(athleteId, token, file),
    });
}
