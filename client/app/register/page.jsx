'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 1. Changed bg-gray-50 to bg-base-200 */
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {/* 2. Changed bg-white to bg-base-100 */}
      <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        {/* 3. Changed text-gray-800 to text-base-content */}
        <h1 className="text-2xl font-bold text-base-content">Create account</h1>
        {error && <p className="text-error text-sm">{error}</p>}
        {/* 4. Swapped standard borders for input utility components */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        {/* 5. Swapped hardcoded background for btn components */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
        {/* 6. Changed text-gray-500 to text-base-content with lower opacity */}
        <p className="text-sm text-base-content/70 text-center">
          Already have an account?{' '}
          <Link href="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
