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
    avatarKey?: string;
};
