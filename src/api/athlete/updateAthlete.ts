import { ENDPOINT } from '../../enums/endpoints.enum';
import type { Athlete } from '../../models/athlete';
import {
    GenericAxiosService,
    AXIOS_METHOD,
} from '../../services/GenericAxiosService';

export async function updateAthlete(
    id: string,
    token: string,
    payload: Partial<Athlete>,
): Promise<Athlete> {
    return await GenericAxiosService<Athlete>({
        url: `${ENDPOINT.ATHLETE_UPDATE(id)}`,
        method: AXIOS_METHOD.PATCH,
        token: token,
        payload: payload,
    });
}
