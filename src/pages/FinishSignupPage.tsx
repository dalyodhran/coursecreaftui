import type { Athlete } from '../models/athlete';
import { useState, type FormEvent } from 'react';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus';
import NavBar from '../components/navbar';
import { UNIT_SYSTEM } from '../enums/unitSystem';
import { useUpdateAthlete } from '../queries/useUpdateAthlete';
import { useUploadAthleteAvatar } from '../queries/useUploadAthleteAvatar';
import { useQueryClient } from '@tanstack/react-query';

type FinishSignupPageProps = {
    athlete: Athlete | null;
    onFinished: () => void;
};

export default function FinishSignupPage({
    athlete,
    onFinished,
}: FinishSignupPageProps) {
    const [localAthlete, setLocalAthlete] = useState<Athlete | null>(athlete);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const today = new Date();
    const toDateOnly = (d: Date) => d.toISOString().slice(0, 10);
    const [form, setForm] = useState<Athlete>({
        unit: athlete?.unit ?? UNIT_SYSTEM.METRIC,
        dateOfBirth: athlete?.dateOfBirth ?? toDateOnly(today),
        status: ATHLETE_PROFILE_STATUS.COMPLETE,
    });

    const queryClient = useQueryClient();
    const updateAthleteMutation = useUpdateAthlete();
    const uploadAthleteAvatarMutation = useUploadAthleteAvatar();

    const handleChange =
        (field: keyof Athlete) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setAvatarFile(file);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!localAthlete) return;

        setSaving(true);
        setSaveError(null);

        try {
            const updatedAthlete = await updateAthleteMutation.mutateAsync({
                athleteId: localAthlete.id ?? '',
                payload: form,
            });

            setLocalAthlete(updatedAthlete);
            setForm(updatedAthlete);

            if (!localAthlete) {
                return;
            }

            if (!avatarFile) {
                console.warn('No file selected');
                return;
            }

            const updatedAthleteWithAvatar =
                await uploadAthleteAvatarMutation.mutateAsync({
                    athleteId: localAthlete.id ?? '',
                    file: avatarFile,
                });

            setLocalAthlete(updatedAthleteWithAvatar);
            queryClient.setQueryData(['athlete'], updatedAthlete);
            onFinished();
        } catch (e: any) {
            console.error(e);
            setSaveError('Could not save your profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (!athlete) return <div className="p-6">Something went wrong.</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />

            <div className="max-w-xl mx-auto mt-10 space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Welcome, {athlete?.firstName}!
                    </h1>
                    <p className="text-gray-600">
                        Let’s finish setting up your profile.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Avatar
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Units
                        </label>

                        <div className="flex items-center gap-3">
                            <span
                                className={`text-xs font-medium ${
                                    form.unit === 'Imperial'
                                        ? 'text-slate-900'
                                        : 'text-slate-400'
                                }`}
                            >
                                Imperial (mi)
                            </span>

                            {/* Toggle switch */}
                            <button
                                type="button"
                                onClick={() => {
                                    const newValue =
                                        form.unit === 'Metric'
                                            ? 'Imperial'
                                            : 'Metric';

                                    handleChange('unit')({
                                        target: { value: newValue },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition"
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                        form.unit === 'Metric'
                                            ? 'translate-x-5'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>

                            {/* Metric label */}
                            <span
                                className={`text-xs font-medium ${
                                    form.unit === 'Metric'
                                        ? 'text-slate-900'
                                        : 'text-slate-400'
                                }`}
                            >
                                Metric (km)
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="block text-sm font-medium">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded p-2 text-sm"
                                value={form.dateOfBirth}
                                onChange={handleChange('dateOfBirth')}
                            />
                        </div>
                    </div>

                    {saveError && (
                        <p className="text-red-500 text-sm">{saveError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60"
                    >
                        {saving ? 'Saving…' : 'Finish setup'}
                    </button>
                </form>
            </div>
        </div>
    );
}
