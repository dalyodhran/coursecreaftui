import { ENDPOINT } from "../../enums/endpoints.enum";
import type { Athlete } from "../../models/athlete";
import { GenericAxiosService, AXIOS_METHOD } from "../../services/GenericAxiosService";

export async function loadAthlete(token: string): Promise<Athlete> {
  return await GenericAxiosService<Athlete>({
    url: ENDPOINT.ATHLETE_ME,
    method: AXIOS_METHOD.GET,
    token: token
  });
}