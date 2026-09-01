'use client';
import { useState } from 'react';
import { signInEmail, signInSocial } from '@/app/actions';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await signInEmail(formData);
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInSocial('google');
    } catch (err) {
      setError('Google sign-in failed');
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
        <h1 className="text-2xl font-bold text-base-content">Log in</h1>
        {/* 4. Changed text-red-500 to text-error */}
        {error && <p className="text-error text-sm">{error}</p>}
        {/* 5. Swapped raw borders for DaisyUI input styling */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        {/* 6. Changed background colors to use btn-neutral / btn component hooks */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-neutral w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {/* 7. Altered text color to scale with the active theme */}
        <p className="text-sm text-base-content/70 text-center">
          No account yet?{' '}
          <Link href="/register" className="link link-primary font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
