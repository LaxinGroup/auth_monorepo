import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center space-y-6">
          <h1 className="card-title text-4xl font-bold text-base-content">Welcome to Auth Demo</h1>
          <p className="text-base-content/70">
            A secure authentication system built with Next.js, Express, Neon, and JWT.
          </p>
          <div className="card-actions flex flex-col w-full gap-3">
            <Link href="/login" className="btn btn-primary w-full">
              Log In
            </Link>
            <Link href="/register" className="btn btn-outline w-full">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
