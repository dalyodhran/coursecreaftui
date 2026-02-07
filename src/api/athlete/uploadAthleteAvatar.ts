import { ENDPOINT } from '../../enums/endpoints.enum';
import {
    AXIOS_METHOD,
    CONTENT_HEADER,
    GenericAxiosService,
} from '../../services/GenericAxiosService';

export async function uploadAthleteAvatar(
    athleteId: string,
    token: string,
    file: File,
): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', file);

    return await GenericAxiosService<string>({
        url: ENDPOINT.ATHLETE_AVATAR_UPLOAD(athleteId),
        method: AXIOS_METHOD.POST,
        token: token,
        payload: formData,
        config: {
            headers: {
                'Content-Type': CONTENT_HEADER.MULTIPART,
            },
        },
    });
}
