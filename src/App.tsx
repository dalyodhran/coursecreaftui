import { useAuth } from 'react-oidc-context';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { useState } from 'react';
import SignUpPage from './pages/SignUpPage';

function App() {
    const auth = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    // OIDC is still finishing redirect/callback
    if (auth.isLoading) {
        return <div className="p-6">Loading…</div>;
    }

    // If authenticated → show profile
    if (auth.isAuthenticated) {
        return <ProfilePage />;
    }

    // Not authenticated yet
    if (showLogin) {
        return <LoginPage onBack={() => setShowLogin(false)} />;
    }

    if (showSignup) {
        return <SignUpPage onBack={() => setShowSignup(false)} />;
    }

    // Default → landing
    return <LandingPage />;
}

export default App;
