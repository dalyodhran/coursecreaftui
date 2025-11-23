import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

export function AuthGate({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    // Only trigger login *after* we're done loading
    useEffect(() => {
        if (!auth.isLoading && !auth.activeNavigator && !auth.isAuthenticated) {
            auth.signinRedirect();
        }
    }, [auth.isLoading, auth.activeNavigator, auth.isAuthenticated, auth]);

    if (auth.isLoading || auth.activeNavigator) {
        // restoring session from storage / handling redirect
        return <div>Loading auth…</div>;
    }

    if (!auth.isAuthenticated) {
        // we just kicked off signinRedirect above
        return <div>Redirecting to login…</div>;
    }

    // Logged in: render the real app
    return <>{children}</>;
}
