import { useAuth } from 'react-oidc-context';
import type { ProfileNavBarProps } from '../models/profileNavBarProps';

const ProfileNavBar: React.FC<ProfileNavBarProps> = ({ name, avatarUrl }) => {
    const auth = useAuth();

    const handleLogout = () => {
        const provider = import.meta.env.VITE_AUTH_PROVIDER;

        if (provider === 'cognito') {
            auth.signoutRedirect({
                extraQueryParams: {
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    logout_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
                },
            });
        } else {
            auth.signoutRedirect();
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-sky-700 to-blue-700">
            <div className="flex items-center gap-3">
                <img
                    src={avatarUrl}
                    alt={`${name} avatar`}
                    className="h-10 w-10 rounded-full border-2 border-white/70"
                />
                <div>
                    <p className="text-sm text-sky-100/80">Athlete</p>
                    <h1 className="text-xl font-semibold text-white">{name}</h1>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    className="text-sm border border-white/40 text-white rounded px-3 py-1 hover:bg-white/20 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default ProfileNavBar;
