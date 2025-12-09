import { useAuth } from 'react-oidc-context';

const NavBar: React.FC = () => {
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
        <header className="flex items-center justify-end px-6 py-4 bg-gradient-to-r from-sky-700 to-blue-700">
            <button
                className="text-sm border border-white/40 text-white rounded px-3 py-1 hover:bg-white/20 transition"
                onClick={handleLogout}
            >
                Logout
            </button>
        </header>
    );
};

export default NavBar;
