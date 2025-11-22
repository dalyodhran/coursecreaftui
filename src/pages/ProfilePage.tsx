import { useLoadAthlete } from '../queries/useLoadAthlete';
import { ATHLETE_PROFILE_STATUS } from '../enums/athleteProfileStatus';
import FinishSignupPage from './FinishSignupPage';
import ProfileNavBar from '../components/profileNavbar';
import { useState } from 'react';

export default function ProfilePage() {
    const { data: athlete, isLoading, isError, error } = useLoadAthlete();
    const [showFinishSignup, setShowFinishSignup] = useState(true);

    if (isLoading) return <div>Loading athlete…</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    if (showFinishSignup && athlete?.status === ATHLETE_PROFILE_STATUS.DRAFT) {
        return (
            <FinishSignupPage
                athlete={athlete}
                onFinished={() => setShowFinishSignup(false)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <ProfileNavBar
                name={`${athlete?.firstName ?? ''} ${athlete?.lastName ?? ''}`}
                avatarUrl={athlete?.avatarKey ?? ''}
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
