import { useAuth } from 'react-oidc-context';

export function AuthGate({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div className="p-6">Loading…</div>;
    }

    if (auth.error) {
        return (
            <div className="p-6">
                <p>Oops, something went wrong with authentication.</p>
                <pre className="text-xs mt-2">{auth.error.message}</pre>
            </div>
        );
    }

    // Logged in: render the real app
    return <>{children}</>;
}
