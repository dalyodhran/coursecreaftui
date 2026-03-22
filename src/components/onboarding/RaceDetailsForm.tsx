import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flag, Calendar } from 'lucide-react';
import type { OnboardingData } from '../../pages/OnboardWizardPage';

interface RaceDetailsFormProps {
    values: OnboardingData;
    onChange: (field: string, value: string) => void;
}

export const RaceDetailsForm: React.FC<RaceDetailsFormProps> = ({ values, onChange }) => (
    <div className="w-full space-y-6 font-['Lexend']">
        <div className="space-y-3">
            <Label htmlFor="raceName" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant flex items-center gap-2">
                <Flag size={16} /> Event Name
            </Label>
            <Input
                id="raceName"
                type="text"
                value={values.race_name || ''}
                onChange={(e) => onChange('race_name', e.target.value)}
                placeholder="e.g. London Marathon"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-outline-variant focus-visible:ring-primary/20 transition-all shadow-sm"
            />
        </div>
        <div className="space-y-3">
            <Label htmlFor="raceDate" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant flex items-center gap-2">
                <Calendar size={16} /> Race Date
            </Label>
            <Input
                id="raceDate"
                type="date"
                value={values.race_date || ''}
                onChange={(e) => onChange('race_date', e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-outline-variant focus-visible:ring-primary/20 transition-all shadow-sm"
            />
        </div>
    </div>
);
