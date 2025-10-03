'use client';

import { useSession } from 'next-auth/react';
import CreateClassForm from '../components/CreateClassForm';
import ClassList from '../components/ClassList';
import UserManagement from '../components/UserManagement';
import MarkAttendance from '../components/MarkAttendance';
import StudentAttendance from '../components/StudentAttendance';

const AdminDashboard = ({ session }) => {
  return (
    <div className="space-y-8">
      <UserManagement />
      <CreateClassForm />
      <ClassList />
    </div>
  );
};

const TeacherDashboard = ({ session }) => {
  return (
    <div className="space-y-8">
      <MarkAttendance />
      <CreateClassForm />
      <ClassList />
    </div>
  );
};

const StudentDashboard = ({ session }) => {
  return (
    <div className="space-y-8">
      <StudentAttendance />
      <ClassList />
    </div>
  );
};


export default function DashboardPage() {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    switch (session?.user?.role) {
      case 'admin':
        return <AdminDashboard session={session} />;
      case 'teacher':
        return <TeacherDashboard session={session} />;
      case 'student':
      default: // Default to student dashboard
        return <StudentDashboard session={session} />;
    }
  };

  return (
    <div className="p-8">
      {session?.user?.name && <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>}
      {renderDashboard()}
    </div>
  );
}
