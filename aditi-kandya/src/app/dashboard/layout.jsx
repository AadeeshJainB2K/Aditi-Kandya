'use client';

import { useState } from 'react';
import Header from '../components/header/header';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className={`pt-20 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        {children}
      </main>
    </div>
  );
}
