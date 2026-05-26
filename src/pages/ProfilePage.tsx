import { useLoadAthlete } from '../queries/useLoadAthlete';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { OnboardingWizardPage } from './OnboardWizardPage.tsx';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { mockDashboardData } from '@/lib/mockDashboardData';
import { TopBar } from '@/components/dashboard/TopBar';

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

    return (
        <div className="flex flex-col min-h-screen bg-background font-body selection:bg-primary selection:text-white">
            <TopBar 
                athleteName={athleteName} 
                athleteAvatar={athlete?.avatarUrl} 
            />
            <main className="pt-32 pb-20 px-12 max-w-[1920px] mx-auto w-full">
                <DashboardLayout data={mockDashboardData} />
            </main>
        </div>
    );
}
