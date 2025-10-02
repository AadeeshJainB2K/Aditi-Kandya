'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Header from '../components/header/header';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-900 dark:text-white">Loading...</div>
        </main>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    // The middleware should handle this, but as a fallback:
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center text-red-500">Access Denied. Please sign in.</div>
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hello, {session.user.name}!
            </h2>

            {session.user.image && (
              <div className="flex justify-center mb-6">
                <Image
                  src={session.user.image}
                  alt="Profile Picture"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Welcome to your dashboard.
            </p>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Sign Out
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
