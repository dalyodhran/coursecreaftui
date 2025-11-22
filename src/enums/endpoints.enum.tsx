export const ENDPOINT = {
    ATHLETE_ME: 'services/athleteservice/api/athletes/me',
    ATHLETE_UPDATE: (id: string) =>
        `services/athleteservice/api/athletes/${id}`,
    ATHLETE_AVATAR_UPLOAD: (id: string) =>
        `services/athleteservice/api/athletes/${id}/avatar`,
};
