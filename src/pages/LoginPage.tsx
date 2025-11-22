import { useAuth } from 'react-oidc-context';

type Props = {
    onBack: () => void;
};

export default function LoginPage({ onBack }: Props) {
    const auth = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white p-8 rounded shadow max-w-sm w-full space-y-4">
                <button onClick={onBack} className="text-xs text-slate-400">
                    ← Back
                </button>
                <h1 className="text-xl font-semibold text-center">Sign in</h1>
                <p className="text-sm text-slate-500 text-center">
                    You&apos;ll be redirected to sign in securely.
                </p>
                <button
                    onClick={() => auth.signinRedirect()}
                    className="w-full bg-slate-900 text-white py-2 rounded"
                >
                    Continue with CourseCrafter
                </button>
            </div>
        </div>
    );
}
