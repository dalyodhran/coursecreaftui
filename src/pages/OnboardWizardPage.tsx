import { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { Athlete } from '../models/athlete.ts';
import { UNIT_SYSTEM, type UnitSystem } from '../enums/unitSystem.tsx';
import { useUpdateAthlete } from '../queries/useUpdateAthlete.ts';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus.tsx';
import { Button } from '@/components/ui/button';

// --- MODULAR COMPONENTS ---
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { OptionCard, type StepOption } from '@/components/onboarding/OptionCard';
import { ProfileStepForm } from '@/components/onboarding/ProfileStepForm';
import { RaceDetailsForm } from '@/components/onboarding/RaceDetailsForm';
import { SummaryCard } from '@/components/onboarding/SummaryCard';
import { ProfileView } from '@/components/onboarding/ProfileView';

// --- TYPES & INTERFACES ---

export interface OnboardingData {
    name: string;
    avatar: string | null;
    units: UnitSystem | null;
    experience: string;
    volume: string;
    days_available: string[];
    goal: string;
    has_race: string;
    race_distance: string;
    race_name: string;
    race_date: string;
    tracking: string;
    [key: string]: string | string[] | boolean | null;
}

interface StepField {
    id: keyof OnboardingData;
    label: string;
    placeholder?: string;
    type?: string;
}

interface Step {
    id: keyof OnboardingData | 'identity';
    question: string;
    description: string;
    type: 'single' | 'multi' | 'form' | 'profile';
    options?: StepOption[];
    fields?: StepField[];
    condition?: (answers: OnboardingData) => boolean;
}

// --- DATA & CONFIGURATION ---

const STEPS: Step[] = [
    {
        id: 'identity',
        question: "Welcome to CourseCrafter.",
        description: "Let's set up your athlete profile and training blocks.",
        type: 'profile'
    },
    {
        id: 'units',
        question: "First things first, how do you measure distance?",
        description: "We'll tailor your plan to your preferred units.",
        type: 'single',
        options: [
            { id: UNIT_SYSTEM.METRIC, label: 'Kilometers (km)' },
            { id: UNIT_SYSTEM.IMPERIAL, label: 'Miles (mi)' },
        ]
    },
    {
        id: 'experience',
        question: "How would you describe your running experience?",
        description: "This helps us calibrate the intensity of your initial training block.",
        type: 'single',
        options: [
            { id: 'newbie', label: 'Newbie', sub: 'Just starting my journey' },
            { id: 'casual', label: 'Casual', sub: 'I run to clear my head' },
            { id: 'consistent', label: 'Consistent', sub: '2-3 times per week' },
            { id: 'competitive', label: 'Competitive', sub: 'Training for PRs' },
        ]
    },
    {
        id: 'volume',
        question: "What is your current average weekly volume?",
        description: "Be honest! We calculate marathon readiness based on historical load.",
        type: 'single',
        options: [
            { id: 'low', label: '0 - 10 km', sub: 'Getting started' },
            { id: 'med', label: '10 - 25 km', sub: 'Building base' },
            { id: 'high', label: '25 - 50 km', sub: 'Solid mileage' },
            { id: 'ultra', label: '50+ km', sub: 'High volume' },
        ]
    },
    {
        id: 'days_available',
        question: "Which days can you run?",
        description: "Select all that apply. We'll build your race cycle around life.",
        type: 'multi',
        options: [
            { id: 'mon', label: 'Mon' },
            { id: 'tue', label: 'Tue' },
            { id: 'wed', label: 'Wed' },
            { id: 'thu', label: 'Thu' },
            { id: 'fri', label: 'Fri' },
            { id: 'sat', label: 'Sat' },
            { id: 'sun', label: 'Sun' },
        ]
    },
    {
        id: 'goal',
        question: "What is your main focus right now?",
        description: "Define your primary objective for this race cycle.",
        type: 'single',
        options: [
            { id: 'base', label: 'Base Building', sub: 'Build endurance safely' },
            { id: 'race', label: 'Race Prep', sub: 'Training for an event' },
            { id: 'speed', label: 'Speed Work', sub: 'Faster 5k/10k times' },
        ]
    },
    {
        id: 'has_race',
        question: "Do you have a specific race event booked?",
        description: "Even if it's not your main focus, we can add it to your calendar.",
        type: 'single',
        condition: (answers) => !!answers.goal && answers.goal !== 'race',
        options: [
            { id: 'yes', label: 'Yes, I have a race', sub: 'I have a date in mind' },
            { id: 'no', label: 'No, just training', sub: 'Open ended schedule' },
        ]
    },
    {
        id: 'race_distance',
        question: "What distance is the race?",
        description: "We'll calibrate your target paces and taper weeks.",
        type: 'single',
        condition: (answers) => answers.goal === 'race' || answers.has_race === 'yes',
        options: [
            { id: '5k', label: '5k', sub: 'Speed & Power' },
            { id: '10k', label: '10k', sub: 'Threshold Focus' },
            { id: 'half', label: 'Half Marathon', sub: '21.1 km' },
            { id: 'full', label: 'Marathon', sub: '42.2 km' },
            { id: 'ultra', label: 'Ultra', sub: '50km+' },
        ]
    },
    {
        id: 'race_details',
        question: "When is the big race?",
        description: "We'll work backward to calculate your training phases and target paces.",
        type: 'form',
        condition: (answers) => answers.goal === 'race' || answers.has_race === 'yes',
        fields: [
            { id: 'race_name', label: 'Race Name (Optional)', placeholder: 'e.g. Boston Marathon' },
            { id: 'race_date', label: 'Race Date', type: 'date' }
        ]
    },
    {
        id: 'tracking',
        question: "How do you track your runs?",
        description: "We can sync automatically with most platforms to monitor your V-Score.",
        type: 'single',
        options: [
            { id: 'watch', label: 'GPS Watch', sub: 'Garmin, Coros, Suunto' },
            { id: 'phone', label: 'Phone App', sub: 'Strava, Nike Run Club' },
            { id: 'manual', label: 'Manual Entry', sub: 'Old school logging' },
        ]
    }
];

// --- MAIN FLOW COMPONENT ---

type FinishSignupPageProps = {
    athlete: Athlete | null;
    onFinished: () => void;
};

export function OnboardingWizardPage({
                                             athlete,
                                             onFinished,
                                         }: FinishSignupPageProps) {
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<OnboardingData>({
        name: athlete ? `${athlete.firstName} ${athlete.lastName}` : '',
        avatar: athlete?.avatarUrl ?? '',
        units: athlete?.unit ?? null,
        experience: athlete?.experience ?? '',
        volume: athlete?.volume ?? '',
        days_available: athlete?.daysAvailable ?? [],
        goal: athlete?.goal ?? '',
        has_race:  athlete?.hasRace === true ? 'yes' : 'false',
        race_distance: athlete?.raceDistance ?? '',
        race_name: athlete?.raceName ?? '',
        race_date: athlete?.raceDate ?? '',
        tracking: athlete?.tracking ?? ''
    });
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [hasGenerated, setHasGenerated] = useState<boolean>(false);
    const updateAthleteMutation = useUpdateAthlete();

    const activeSteps = useMemo(() => {
        return STEPS.filter(step => {
            return !step.condition || step.condition(answers);
        });
    }, [answers]);

    const currentStep = activeSteps[stepIndex];
    const isLastStep = stepIndex === activeSteps.length - 1;

    const handleSelect = (optionId: string) => {
        if (currentStep.type === 'multi') {
            const current = answers[currentStep.id] as string[];
            const next = current.includes(optionId)
                ? current.filter(item => item !== optionId)
                : [...current, optionId];

            setAnswers({ ...answers, [currentStep.id]: next });
        } else {
            setAnswers({ ...answers, [currentStep.id]: optionId });
        }
    };

    const handleFormChange = (field: string, value: string) => {
        setAnswers(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (athlete?.id && currentStep) {
            try {
                const payload: Partial<Athlete> = { id: athlete.id };

                if (currentStep.id === 'identity') {
                    const [firstName, ...lastNameParts] = answers.name.trim().split(/\s+/);
                    payload.firstName = firstName;
                    payload.lastName = lastNameParts.join(' ');
                } else if (currentStep.id === 'units') {
                    payload.unit = answers.units ?? undefined;
                } else if (currentStep.id === 'experience') {
                    payload.experience = answers.experience ?? '';
                } else if (currentStep.id === 'volume') {
                    payload.volume = answers.volume ?? '';
                } else if (currentStep.id === 'days_available') {
                    payload.daysAvailable = answers.days_available ?? [];
                } else if (currentStep.id === 'goal') {
                    payload.goal = answers.goal ?? '';
                } else if (currentStep.id === 'has_race') {
                    payload.hasRace = answers.has_race === 'yes';
                } else if (currentStep.id === 'race_distance') {
                    payload.raceDistance = answers.race_distance ?? '';
                } else if (currentStep.id === 'race_details') {
                    payload.raceName = answers.race_name ?? '';
                    payload.raceDate = answers.race_date ?? '';
                } else if (currentStep.id === 'tracking') {
                    payload.tracking = answers.tracking ?? '';
                }

                await handleAthleteUpdate(athlete.id, payload);

            } catch (error) {
                console.error("Failed to sync step data", error);
            }
        }

        setStepIndex(prev => prev + 1);

        if (stepIndex >= activeSteps.length - 1) {
            setIsFinished(true);
        }
    };

    const handleAthleteUpdate = async (athleteId: string, payload: Partial<Athlete>) => {
        await updateAthleteMutation.mutateAsync({
            athleteId: athleteId,
            payload: payload as Athlete
        });
    }

    const handleBack = () => {
        if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    };

    const handleGenerate = async (onFinished: () => void) => {
        if (!athlete?.id) {
            return;
        }

        const payload: Partial<Athlete> = { status: ATHLETE_PROFILE_STATUS.COMPLETE };
        await handleAthleteUpdate(athlete?.id, payload);
        setHasGenerated(true);
        onFinished();
    }

    const canProceed = () => {
        if (!currentStep) return false;
        if (currentStep.type === 'profile') return !!answers.name;
        if (currentStep.type === 'form') return !!answers.race_date;

        const val = answers[currentStep.id];
        if (Array.isArray(val)) return val.length > 0;
        return !!val;
    };

    if (hasGenerated) {
        return (
            <div className="min-h-screen bg-surface flex justify-center p-6 font-['Lexend']">
                <ProfileView data={answers} />
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center p-6 font-['Lexend']">
                <SummaryCard data={answers} onGenerate={() => handleGenerate(onFinished)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center p-4 sm:p-8 font-['Lexend'] selection:bg-primary-container selection:text-white overflow-x-hidden">

            {/* Header / Nav */}
            <div className="w-full max-w-2xl flex justify-between items-center mb-8 mt-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    disabled={stepIndex === 0}
                    className={stepIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-xl'}
                >
                    <ChevronLeft size={24} />
                </Button>
                <span className="text-on-surface-variant text-sm font-bold tracking-widest uppercase">
                    STEP {stepIndex + 1} OF {activeSteps.length}
                </span>
                <div className="w-10" />
            </div>

            <div className="w-full max-w-2xl">
                <ProgressBar current={stepIndex} total={activeSteps.length} className="mb-12" />

                {currentStep && (
                    <div key={currentStep.id} className="animate-in fade-in slide-in-from-right-8 duration-500">

                        <div className="mb-12 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-on-surface mb-4 leading-tight">
                                {currentStep.question}
                            </h1>
                            <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
                                {currentStep.description}
                            </p>
                        </div>

                        {currentStep.type === 'profile' ? (
                            <ProfileStepForm
                                athlete={athlete}
                                values={answers}
                                onChange={handleFormChange}
                            />
                        ) : currentStep.type === 'form' ? (
                            <RaceDetailsForm
                                values={answers}
                                onChange={handleFormChange}
                            />
                        ) : (
                            <div className={`
                                grid gap-4 
                                ${currentStep.options?.length && currentStep.options.length > 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}
                            `}>
                                {currentStep.options?.map((opt) => (
                                    <OptionCard
                                        key={opt.id}
                                        option={opt}
                                        selected={answers[currentStep.id]}
                                        onClick={handleSelect}
                                        type={currentStep.type}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <div className="mt-16 flex justify-end">
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                size="lg"
                                className={`
                                    group px-8 py-7 rounded-2xl font-black tracking-tight text-lg transition-all duration-300
                                    ${canProceed()
                                        ? 'kinetic-gradient text-white hover:shadow-[0px_16px_32px_rgba(0,90,180,0.3)] hover:-translate-y-1 active:scale-95'
                                        : 'bg-surface-container border border-outline-variant/20 text-on-surface-variant cursor-not-allowed opacity-60'
                                    }
                                `}
                            >
                                {isLastStep ? 'Finish Setup' : 'Continue'}
                                {!isLastStep && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform ml-2" />}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
