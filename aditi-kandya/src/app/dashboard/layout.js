'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Header from '../components/header/header';

export default function OwnerDashboardLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === 'unauthenticated' || !['owner', 'ADMIN'].includes(session?.user?.role)) {
    redirect('/dashboard');
    return null; // Stop rendering anything further
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex pt-20"> {/* Adjust pt to account for fixed header height */}
        <aside className="w-60 h-[calc(100vh-5rem)] sticky top-20 bg-white dark:bg-gray-800 p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Owner Menu</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/owner/teachers" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Teachers
                </Link>
              </li>
              <li className="mb-2">
              <Link href="/owner/students" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Manage Students
              </Link>
              <Link href="/owner/courses" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Create Course
              </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}