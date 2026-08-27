'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load user');
        setUser(data.user);
      })
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem('token');
        setTimeout(() => router.push('/login'), 1500);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    /* 1. Changed bg-gray-50 to bg-base-200 */
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {/* 2. Changed bg-white to bg-base-100 */}
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-sm text-center space-y-4">
        {/* 3. Changed text-gray-800 to text-base-content */}
        <h1 className="text-2xl font-bold text-base-content">Dashboard</h1>
        {/* 4. Changed text-red-500 to text-error */}
        {error && <p className="text-error text-sm">{error}</p>}
        {user && (
          <div className="space-y-2">
            {/* 5. Changed text-gray-600 to text-base-content with lower opacity */}
            <p className="text-base-content/70">Logged in as</p>
            {/* 6. Changed text-gray-800 to text-base-content */}
            <p className="font-semibold text-base-content">{user.email}</p>
          </div>
        )}
        {/* 7. Changed text-gray-400 to standard loading text indicator helper */}
        {!user && !error && <p className="text-base-content/40">Loading...</p>}
        {/* 8. Swapped custom background utilities for the native btn-error class */}
        <button
          onClick={handleLogout}
          className="btn btn-error w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
