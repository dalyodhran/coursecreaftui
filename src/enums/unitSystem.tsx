export const UNIT_SYSTEM = {
    METRIC: 'Metric',
    IMPERIAL: 'Imperial',
} as const;

export type UnitSystem = (typeof UNIT_SYSTEM)[keyof typeof UNIT_SYSTEM];
