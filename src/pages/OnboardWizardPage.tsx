import React, { useState, useMemo } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Activity,
    TrendingUp,
    Calendar,
    MapPin,
    Watch,
    Award,
    Zap,
    Heart,
    Mountain,
    Smartphone,
    ClipboardList,
    Flame,
    Flag,
    ThumbsUp,
    XCircle,
    BarChart3,
    Timer,
    Camera,
    User
} from 'lucide-react';
import type { Athlete } from '../models/athlete.ts';
import { useUploadAthleteAvatar } from '../queries/useUploadAthleteAvatar.ts';
import { UNIT_SYSTEM, type UnitSystem } from '../enums/unitSystem.tsx';
import { useUpdateAthlete } from '../queries/useUpdateAthlete.ts';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus.tsx';

// --- TYPES & INTERFACES ---

export interface OnboardingData {
    name: string;
    avatar: string | null; // For this demo we'll just store a string/simulated URL
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

interface StepOption {
    id: string;
    label: string;
    sub?: string;
    icon?: React.ElementType | null;
    color?: string;
}

interface StepField {
    id: keyof OnboardingData;
    label: string;
    placeholder?: string;
    type?: string;
}

interface Step {
    id: keyof OnboardingData | 'identity'; // Allow 'identity' as a step ID
    question: string;
    description: string;
    type: 'single' | 'multi' | 'form' | 'profile'; // Added 'profile' type
    options?: StepOption[];
    fields?: StepField[];
    condition?: (answers: OnboardingData) => boolean;
}

// --- DATA & CONFIGURATION ---

const STEPS: Step[] = [
    {
        id: 'identity',
        question: "Welcome to CourseCrafter.",
        description: "Let's set up your athlete profile.",
        type: 'profile'
    },
    {
        id: 'units',
        question: "First things first, how do you measure distance?",
        description: "We'll tailor your plan to your preferred units.",
        type: 'single',
        options: [
            { id: UNIT_SYSTEM.METRIC, label: 'Kilometers (km)', icon: MapPin },
            { id: UNIT_SYSTEM.IMPERIAL, label: 'Miles (mi)', icon: MapPin },
        ]
    },
    {
        id: 'experience',
        question: "How would you describe your running experience?",
        description: "This helps us calibrate the intensity of your initial weeks.",
        type: 'single',
        options: [
            { id: 'newbie', label: 'Newbie', sub: 'Just starting my journey', icon: Zap },
            { id: 'casual', label: 'Casual', sub: 'I run to clear my head', icon: Heart },
            { id: 'consistent', label: 'Consistent', sub: '2-3 times per week', icon: Activity },
            { id: 'competitive', label: 'Competitive', sub: 'Training for PRs', icon: Award },
        ]
    },
    {
        id: 'volume',
        question: "What is your current average weekly volume?",
        description: "Be honest! We don't want to injure you.",
        type: 'single',
        options: [
            { id: 'low', label: '0 - 10 km', sub: 'Getting started', icon: null },
            { id: 'med', label: '10 - 25 km', sub: 'Building base', icon: null },
            { id: 'high', label: '25 - 50 km', sub: 'Solid mileage', icon: null },
            { id: 'ultra', label: '50+ km', sub: 'High volume', icon: null },
        ]
    },
    {
        id: 'days_available',
        question: "Which days can you run?",
        description: "Select all that apply. We'll build your plan around life.",
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
        description: "Pick your North Star.",
        type: 'single',
        options: [
            { id: 'base', label: 'Base Building', sub: 'Build endurance safely', icon: TrendingUp, color: 'text-blue-500' },
            { id: 'race', label: 'Race Prep', sub: 'Training for an event', icon: Flame, color: 'text-orange-500' },
            { id: 'speed', label: 'Speed Work', sub: 'Faster 5k/10k times', icon: Zap, color: 'text-purple-500' },
        ]
    },
    {
        id: 'has_race',
        question: "Do you have a specific race event booked?",
        description: "Even if it's not your main focus, we can add it to your calendar.",
        type: 'single',
        // Only ask this if they DIDN'T select 'Race Prep' above (since we already know they have a race in that case)
        condition: (answers) => !!answers.goal && answers.goal !== 'race',
        options: [
            { id: 'yes', label: 'Yes, I have a race', sub: 'I have a date in mind', icon: ThumbsUp },
            { id: 'no', label: 'No, just training', sub: 'Open ended schedule', icon: XCircle },
        ]
    },
    {
        id: 'race_distance',
        question: "What distance is the race?",
        description: "We'll calibrate your long runs and taper weeks.",
        type: 'single',
        // Show if Goal is Race OR if they said "Yes" to having a race
        condition: (answers) => answers.goal === 'race' || answers.has_race === 'yes',
        options: [
            { id: '5k', label: '5k', sub: 'Speed & Power', icon: Zap },
            { id: '10k', label: '10k', sub: 'Threshold Focus', icon: Flame },
            { id: 'half', label: 'Half Marathon', sub: '21.1 km', icon: Mountain },
            { id: 'full', label: 'Marathon', sub: '42.2 km', icon: Award },
            { id: 'ultra', label: 'Ultra', sub: '50km+', icon: MapPin },
        ]
    },
    {
        id: 'race_details',
        question: "When is the big race?",
        description: "We'll work backward to calculate your training phases.",
        type: 'form',
        // Show if Goal is Race OR if they said "Yes" to having a race
        condition: (answers) => answers.goal === 'race' || answers.has_race === 'yes',
        fields: [
            { id: 'race_name', label: 'Race Name (Optional)', placeholder: 'e.g. Boston Marathon' },
            { id: 'race_date', label: 'Race Date', type: 'date' }
        ]
    },
    {
        id: 'tracking',
        question: "How do you track your runs?",
        description: "We can sync automatically with most platforms.",
        type: 'single',
        options: [
            { id: 'watch', label: 'GPS Watch', sub: 'Garmin, Coros, Suunto', icon: Watch },
            { id: 'phone', label: 'Phone App', sub: 'Strava, Nike Run Club', icon: Smartphone },
            { id: 'manual', label: 'Manual Entry', sub: 'Old school logging', icon: ClipboardList },
        ]
    }
];

// --- COMPONENTS ---

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = ((current + 1) / total) * 100;
    return (
        <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
            <div
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

interface OptionCardProps {
    option: StepOption;
    selected: string | string[] | boolean | null;
    onClick: (id: string) => void;
    type: 'single' | 'multi' | 'form' | 'profile';
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selected, onClick, type }) => {
    const isSelected = type === 'multi'
        ? Array.isArray(selected) && selected.includes(option.id)
        : selected === option.id;

    const Icon = option.icon;

    return (
        <button
            onClick={() => onClick(option.id)}
            className={`
        group relative w-full text-left p-6 rounded-xl border transition-all duration-200
        flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10
        ${isSelected
                ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-900/20'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }
      `}
        >
            {/* Icon Wrapper */}
            {Icon && (
                <div className={`
          p-3 rounded-lg transition-colors
          ${isSelected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}
        `}>
                    <Icon size={24} />
                </div>
            )}

            {/* Text Content */}
            <div className="flex-1">
                <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {option.label}
                </h3>
                {option.sub && (
                    <p className="text-sm text-slate-500 mt-1">{option.sub}</p>
                )}
            </div>

            {/* Selection Indicator */}
            <div className={`
        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
        ${isSelected
                ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                : 'border-slate-700 group-hover:border-slate-600'
            }
      `}>
                {isSelected && <Check size={14} strokeWidth={4} />}
            </div>
        </button>
    );
};

interface ProfileStepFormProps {
    athlete: Athlete | null
    values: OnboardingData;
    onChange: (field: string, value: string) => void;
}

const ProfileStepForm: React.FC<ProfileStepFormProps> = ({ athlete, values, onChange }) => {
    const [preview, setPreview] = useState<string | null>(values.avatar);
    const [isUploading, setIsUploading] = useState(false);

    const uploadAthleteAvatarMutation = useUploadAthleteAvatar();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // 1. Show immediate local preview
            const localUrl = URL.createObjectURL(file);
            setPreview(localUrl);

            // 2. Start Upload Logic
            setIsUploading(true);

            try {
                const avatarUrl =
                    await uploadAthleteAvatarMutation.mutateAsync({
                        athleteId: athlete?.id ?? '',
                        file: file,
                    });

                onChange('avatar', avatarUrl);
            } catch (error) {
                console.error("Upload failed", error);
                // Handle error (e.g. show toast)
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-500">

            {/* Avatar Upload Circle */}
            <div className="relative mb-8 group cursor-pointer">
                <div className={`
          w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-900 
          flex items-center justify-center overflow-hidden transition-all
          group-hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/20
        `}>
                    {preview ? (
                        <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <User size={48} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
                    )}
                </div>

                {/* Camera Icon Badge */}
                <div className="absolute bottom-0 right-0 p-2 bg-slate-800 rounded-full border-4 border-slate-950 text-white group-hover:bg-emerald-500 transition-colors">
                    <Camera size={16} />
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                />
            </div>

            {/* Name Input */}
            <div className="w-full space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Display Name</label>
                <input
                    type="text"
                    value={values.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="e.g. Alex Runner"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white text-lg text-center placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    autoFocus
                />
            </div>
        </div>
    );
};

interface RaceDetailsFormProps {
    values: OnboardingData;
    onChange: (field: string, value: string) => void;
}

const RaceDetailsForm: React.FC<RaceDetailsFormProps> = ({ values, onChange }) => (
    <div className="w-full space-y-6">
        <div className="space-y-3">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Flag size={16} /> Event Name
            </label>
            <input
                type="text"
                value={values.race_name || ''}
                onChange={(e) => onChange('race_name', e.target.value)}
                placeholder="e.g. London Marathon"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
        </div>
        <div className="space-y-3">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Calendar size={16} /> Race Date
            </label>
            <input
                type="date"
                value={values.race_date || ''}
                onChange={(e) => onChange('race_date', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all [color-scheme:dark]"
            />
        </div>
    </div>
);

interface SummaryCardProps {
    data: OnboardingData;
    onGenerate: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data, onGenerate }) => {
    return (
        <div className="animate-in fade-in zoom-in duration-500">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto relative overflow-hidden">

                {/* "Hero Card" Glow Effect from Design System */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600" />
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full" />

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 overflow-hidden border-2 border-emerald-500/20">
                        {data.avatar ? (
                            <img src={data.avatar} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold">{data.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">Ready to go, {data.name.split(' ')[0]}!</h2>
                    <p className="text-slate-400 mb-8">
                        We've set your initial VDOT to <span className="text-emerald-400 font-mono font-bold">42</span> based on your profile.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Easy Pace</div>
                            <div className="text-white font-mono text-lg">5:45 - 6:15</div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Weekly Goal</div>
                            <div className="text-white font-mono text-lg">25 km</div>
                        </div>
                    </div>

                    {data.race_date && (
                        <div className="mb-8 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                                <Flag size={16} />
                                <span className="font-bold uppercase text-xs tracking-wider">Target Race</span>
                            </div>
                            <div className="text-white font-medium">{data.race_name || 'Upcoming Race'}</div>
                            <div className="text-slate-400 text-sm">{new Date(data.race_date).toLocaleDateString()}</div>
                        </div>
                    )}

                    <button
                        onClick={onGenerate}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Generate First Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ProfileViewProps {
    data: OnboardingData;
}

const ProfileView: React.FC<ProfileViewProps> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Training Dashboard</h1>
                    <p className="text-slate-500">Welcome back, {data.name}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-white font-medium">{data.name}</div>
                        <div className="text-slate-500 text-xs">VDOT 42.0</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-500 font-bold text-lg overflow-hidden">
                        {data.avatar ? (
                            <img src={data.avatar} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            data.name.charAt(0).toUpperCase()
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Metric 1 */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Activity size={18} />
                        <span className="text-sm font-medium">Training Status</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">Base Building</div>
                    <div className="text-emerald-500 text-sm flex items-center gap-1">
                        <TrendingUp size={14} /> On Track
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BarChart3 size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <BarChart3 size={18} />
                        <span className="text-sm font-medium">Weekly Volume</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{data.volume === 'low' ? '12 km' : '28 km'}</div>
                    <div className="text-slate-500 text-sm">Target for this week</div>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Timer size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Timer size={18} />
                        <span className="text-sm font-medium">Next Run</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">Tomorrow</div>
                    <div className="text-slate-500 text-sm">45min Easy Run</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Upcoming Schedule */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar size={20} className="text-emerald-500" />
                        Upcoming Workouts
                    </h2>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700 cursor-pointer">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                                        <span className="text-slate-500 text-xs font-bold uppercase">Oct</span>
                                        <span className="text-white font-bold">{14 + i}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium">{i === 1 ? 'Long Run' : 'Recovery Run'}</h4>
                                        <p className="text-slate-500 text-sm">{i === 1 ? '15km @ 5:45/km' : '8km @ 6:15/km'}</p>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Race Goal */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Flag size={20} className="text-emerald-500" />
                        Primary Goal
                    </h2>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {data.race_name || 'Marathon Training'}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">
                                {data.race_date ? new Date(data.race_date).toLocaleDateString() : 'No date set'}
                            </p>

                            <div className="w-full bg-slate-950 rounded-full h-2 mb-2 overflow-hidden">
                                <div className="bg-emerald-500 w-1/4 h-full" />
                            </div>
                            <div className="flex justify-between w-full text-xs text-slate-500">
                                <span>Week 1</span>
                                <span>Week 16</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

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

    // Dynamic Step Filtering: Only show steps where the condition is met (or no condition exists)
    const activeSteps = useMemo(() => {
        return STEPS.filter(step => {
            return !step.condition || step.condition(answers);
        });
    }, [answers]);

    const currentStep = activeSteps[stepIndex];
    const isLastStep = stepIndex === activeSteps.length - 1;

    // Auto-advance for single select questions
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

    const handleAthleteUpdate = async (athleteId: string, payload: Athlete) => {
        await updateAthleteMutation.mutateAsync({
            athleteId: athleteId,
            payload
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

    // Check if current step has a valid answer to enable "Next" button
    const canProceed = () => {
        // Safety check in case we switch steps and render before state update
        if (!currentStep) return false;

        // Custom validation per type
        if (currentStep.type === 'profile') return !!answers.name;
        if (currentStep.type === 'form') return !!answers.race_date;

        const val = answers[currentStep.id];
        if (Array.isArray(val)) return val.length > 0;
        return !!val;
    };

    if (hasGenerated) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center p-6">
                <ProfileView data={answers} />
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <SummaryCard data={answers} onGenerate={() => handleGenerate(onFinished)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center p-4 sm:p-8 font-sans">

            {/* Header / Nav */}
            <div className="w-full max-w-2xl flex justify-between items-center mb-8 mt-4">
                <button
                    onClick={handleBack}
                    disabled={stepIndex === 0}
                    className={`
            p-2 rounded-full hover:bg-slate-900 transition-colors
            ${stepIndex === 0 ? 'opacity-0 cursor-default' : 'text-slate-500 hover:text-emerald-500'}
          `}
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-slate-500 text-sm font-medium tracking-wide">
          STEP {stepIndex + 1} OF {activeSteps.length}
        </span>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            <div className="w-full max-w-2xl">
                <ProgressBar current={stepIndex} total={activeSteps.length} />

                {/* Question Container with Animation Key */}
                {currentStep && (
                    <div key={currentStep.id} className="animate-in fade-in slide-in-from-right-8 duration-500">

                        <div className="mb-10 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                                {currentStep.question}
                            </h1>
                            <p className="text-slate-500 text-lg">
                                {currentStep.description}
                            </p>
                        </div>

                        {/* Render different content based on step type */}
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
                        <div className="mt-12 flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`
                  group flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all
                  ${canProceed()
                                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:px-10'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                }
                `}
                            >
                                {isLastStep ? 'Finish' : 'Continue'}
                                {!isLastStep && <ChevronRight size={20} />}
                            </button>
                        </div>
                    </div>

                )}

            </div>
        </div>
    );
}