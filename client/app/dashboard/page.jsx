import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { signOutUser } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-sm text-center space-y-4">
        <h1 className="text-2xl font-bold text-base-content">Dashboard</h1>
        <div className="space-y-2">
          <p className="text-base-content/70">Logged in as</p>
          <p className="font-semibold text-base-content">{session.user.email}</p>
        </div>
        <form action={signOutUser}>
          <button
            type="submit"
            className="btn btn-error w-full"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
