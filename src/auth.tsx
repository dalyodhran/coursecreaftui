import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
    authority: 'http://localhost:9080/realms/jhipster', // your keycloak realm
    client_id: 'web_app',
    redirect_uri: 'http://localhost:5173',
    response_type: 'code',
    scope: 'openid profile email',
};

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
