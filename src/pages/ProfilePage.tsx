import { useLoadAthlete } from '../queries/useLoadAthlete';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { OnboardingWizardPage } from './OnboardWizardPage.tsx';

// --- DASHBOARD COMPONENTS ---
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { TrainingOverview } from '@/components/dashboard/TrainingOverview';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RaceGoal } from '@/components/dashboard/RaceGoal';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

// --- ICONS ---
import { 
    Zap, 
    Activity as ActivityIcon, 
    TrendingUp, 
    Clock 
} from 'lucide-react';

export default function ProfilePage() {
    const auth = useAuth();
    const { data: athlete, isLoading, isError, error } = useLoadAthlete();
    const [showFinishSignup, setShowFinishSignup] = useState(true);

    useEffect(() => {
        if (isError) {
            const status = (error as any)?.response?.status;

            if (status === 401) {
                // Clear stale session and go to login
                auth.removeUser().then(() => {
                    auth.signinRedirect();
                });
            }
        }
    }, [isError, error, auth]);

    if (isLoading) return <div className="p-12 text-center font-black tracking-tight text-slate-400">Syncing athlete data...</div>;
    if (isError) return <div className="p-12 text-center text-red-500 font-bold">Error: {error?.message}</div>;

    if (showFinishSignup && athlete?.status === ATHLETE_PROFILE_STATUS.DRAFT) {
        return (
            <OnboardingWizardPage
                athlete={athlete}
                onFinished={() => setShowFinishSignup(false)}
            />
        );
    }

    const athleteName = `${athlete?.firstName ?? ''} ${athlete?.lastName ?? ''}`;

    // --- MOCK DATA FOR DEMO ---
    const mockActivities = [
        { id: '1', name: 'Threshold Intervals', date: 'Today', type: 'Quality', distance: '12.4 km', duration: '54:20', vScore: 48 },
        { id: '2', name: 'Recovery Run', date: 'Yesterday', type: 'Easy', distance: '8.0 km', duration: '45:10', vScore: 42 },
        { id: '3', name: 'Long Run', date: 'Oct 14', type: 'Endurance', distance: '24.0 km', duration: '2:10:15', vScore: 45 },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-['Lexend'] selection:bg-blue-100">
            <Sidebar />
            
            <div className="flex-1 flex flex-col">
                <TopBar 
                    athleteName={athleteName} 
                    athleteAvatar={athlete?.avatarUrl} 
                />

                <main className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Athlete Overview</p>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Welcome back, {athlete?.firstName}</h2>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-white px-4 py-2 border rounded-sm shadow-sm">
                            <Clock className="w-4 h-4" />
                            <span>Last sync: Just now</span>
                        </div>
                    </div>

                    {/* Top Row: Main Highlights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <TrainingOverview 
                                currentPhase={athlete?.goal === 'race' ? 'Race Specific Phase' : 'Base Building'}
                                progressPercent={65}
                                nextSession={{
                                    title: 'Steady State Run',
                                    details: '10km @ 4:45/km steady pace'
                                }}
                            />
                        </div>
                        <div>
                            <RaceGoal 
                                raceName={athlete?.raceName ?? 'Fall Marathon'}
                                raceDate={athlete?.raceDate ?? '2025-11-15'}
                                distance={athlete?.raceDistance ?? '42.2 km'}
                                targetPace={athlete?.tracking === 'watch' ? '4:15 min/km' : '--:-- min/km'}
                            />
                        </div>
                    </div>

                    {/* Middle Row: Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard 
                            label="Current VDOT"
                            value={48.2}
                            change={{ value: '1.2', trend: 'up' }}
                            icon={TrendingUp}
                        />
                        <MetricCard 
                            label="Weekly Volume"
                            value={athlete?.volume === 'high' ? '54.2' : '32.8'}
                            unit="km"
                            change={{ value: '4.5', trend: 'up' }}
                            icon={ActivityIcon}
                        />
                        <MetricCard 
                            label="Training V-Score"
                            value={72}
                            unit="/ 100"
                            change={{ value: '2', trend: 'neutral' }}
                            icon={Zap}
                        />
                        <MetricCard 
                            label="Marathon Readiness"
                            value="84"
                            unit="%"
                            change={{ value: '5%', trend: 'up' }}
                            icon={ActivityIcon}
                        />
                    </div>

                    {/* Bottom Row: Activity & Detailed Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <ActivityFeed activities={mockActivities} />
                        </div>
                        <div className="bg-white border rounded-sm p-8 flex flex-col justify-center items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center">
                                <ActivityIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight text-slate-900">Training Intelligence</h3>
                            <p className="text-sm text-slate-500 font-medium">
                                Your aerobic base has increased by <span className="text-blue-700 font-bold">12%</span> in this training block. We recommend increasing your next long run by 2km.
                            </p>
                            <button className="text-blue-700 text-sm font-black uppercase tracking-widest hover:underline">
                                View Full Analysis
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
