import { useAuth } from 'react-oidc-context';

const NavBar: React.FC = () => {
    const auth = useAuth();
    return (
        <header className="flex items-center justify-end px-6 py-4 bg-gradient-to-r from-sky-700 to-blue-700">
            <button
                onClick={() => {
                    (async () => {
                        await auth.signoutRedirect({
                            post_logout_redirect_uri: 'http://localhost:5173',
                        });
                    })();
                }}
                className="text-sm border border-white/40 text-white rounded px-3 py-1 hover:bg-white/20 transition"
            >
                Logout
            </button>
        </header>
    );
};

export default NavBar;
