import { useLoadAthlete } from '../queries/useLoadAthlete';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus';
import ProfileNavBar from '../components/profileNavbar';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { OnboardingWizardPage } from './OnboardWizardPage.tsx';

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

    if (isLoading) return <div>Loading athlete…</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    if (showFinishSignup && athlete?.status === ATHLETE_PROFILE_STATUS.DRAFT) {
        return (
            <OnboardingWizardPage
                athlete={athlete}
                onFinished={() => setShowFinishSignup(false)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <ProfileNavBar
                name={`${athlete?.firstName ?? ''} ${athlete?.lastName ?? ''}`}
                avatarUrl={athlete?.avatarUrl ?? ''}
            />
            <main className="p-6">
                <div className="bg-white rounded border p-4 max-w-md">
                    <h2 className="text-lg font-semibold mb-2">Your profile</h2>
                    <p className="text-sm text-slate-500 mb-1">
                        Name: {athlete?.firstName ?? '—'}{' '}
                        {athlete?.lastName ?? ''}
                    </p>
                    <p className="text-sm text-slate-500 mb-1">
                        Email: {athlete?.email ?? '—'}
                    </p>
                </div>
            </main>
        </div>
    );
}
