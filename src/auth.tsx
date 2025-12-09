import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
    authority: import.meta.env.VITE_AUTHORITY,
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    userStore: new WebStorageStateStore({
        store: window.localStorage,
    }),
};

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    console.log({ oidcConfig });
    return (
        <AuthProvider
            {...oidcConfig}
            onSigninCallback={() => {
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );
            }}
        >
            {children}
        </AuthProvider>
    );
}
