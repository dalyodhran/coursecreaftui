import { useState } from 'react';
import { useAuth } from 'react-oidc-context';

type Props = {
    onBack: () => void;
};

export default function SignUpPage({ onBack }: Props) {
    const auth = useAuth();
    const [email, setEmail] = useState('');

    const handleSignUp = () => {
        auth.signinRedirect({
            extraQueryParams: {
                ...(email ? { login_hint: email } : {}),
                prompt: 'create',
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white p-8 rounded shadow max-w-sm w-full space-y-4">
                <button onClick={onBack} className="text-xs text-slate-400">
                    ← Back
                </button>
                <h1 className="text-xl font-semibold text-center">
                    Create your account
                </h1>
                <p className="text-sm text-slate-500 text-center">
                    We&apos;ll send you to our secure sign up page.
                </p>

                <label className="block text-sm text-slate-600">
                    Email
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
                        type="email"
                        placeholder="you@example.com"
                    />
                </label>

                <button
                    onClick={handleSignUp}
                    className="w-full bg-slate-900 text-white py-2 rounded"
                >
                    Continue
                </button>

                <p className="text-xs text-slate-400 text-center">
                    You&apos;ll finish sign up on the secure Keycloak page.
                </p>
            </div>
        </div>
    );
}
