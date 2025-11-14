import { useAuth } from "react-oidc-context";
import { useLoadAthlete } from "../queries/useLoadAthlete";

export default function ProfilePage() {
  const auth = useAuth();
  const { data: athlete, isLoading, isError, error } = useLoadAthlete();
  const user = auth.user;

  if (isLoading) return <div>Loading athlete…</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-lg font-semibold">CourseCrafter</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">
            {user?.profile?.email || user?.profile?.preferred_username}
          </span>
          <button
            onClick={() => auth.signoutRedirect()}
            className="text-sm border rounded px-3 py-1"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-6">
        <div className="bg-white rounded border p-4 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Your profile</h2>
          <p className="text-sm text-slate-500 mb-1">
            Name: {athlete?.firstName ?? "—"} {athlete?.lastName ?? ""}
          </p>
          <p className="text-sm text-slate-500 mb-1">
            Email: {athlete?.email ?? "—"}
          </p>
          <p className="text-sm text-slate-500">
            Subject (id): {athlete?.id}
          </p>
        </div>
      </main>
    </div>
  );
}