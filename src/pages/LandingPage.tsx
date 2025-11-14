type Props = {
  onLoginClick: () => void;
  onSignupClick: () => void;
};

export default function LandingPage({ onLoginClick, onSignupClick }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-lg font-semibold">CourseCrafter</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onLoginClick}
            className="text-sm bg-slate-900 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={onSignupClick}
            className="text-sm border border-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-100"
          >
            Sign up
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-3">
          Build smarter training plans.
        </h2>
        <p className="text-slate-600 max-w-md mb-6">
          Connect your account to view your athlete profile, upcoming workouts,
          and race plans.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onLoginClick}
            className="bg-slate-900 text-white px-6 py-3 rounded"
          >
            Get started
          </button>
          <button
            onClick={onSignupClick}
            className="border border-slate-300 text-slate-700 px-6 py-3 rounded hover:bg-slate-100"
          >
            Sign up
          </button>
        </div>
      </main>
    </div>
  );
}
