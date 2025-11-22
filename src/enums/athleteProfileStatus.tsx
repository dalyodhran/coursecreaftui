export const ATHLETE_PROFILE_STATUS = {
    DRAFT: 'DRAFT',
    COMPLETE: 'COMPLETE',
} as const;

export type AthleteProfileStatus =
    (typeof ATHLETE_PROFILE_STATUS)[keyof typeof ATHLETE_PROFILE_STATUS];
