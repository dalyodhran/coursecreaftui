import type { AthleteProfileStatus } from '../enums/athleteProfileStatus';
import type { UnitSystem } from '../enums/unitSystem';

export type Athlete = {
    id?: string;
    identityId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    status?: AthleteProfileStatus;
    unit?: UnitSystem;
    dateOfBirth?: string;
    avatarUrl?: string;
    experience?: string;
    volume?: string;
    daysAvailable?: string[];
    goal?: string;
    hasRace?: boolean;
    raceDistance?: string;
    raceName?: string;
    raceDate?: string;
    tracking?: string;
};
