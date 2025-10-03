'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function StudentAttendance() {
  const { data: session } = useSession();
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!session || !session.user || !session.user.id) return;
      try {
        const res = await fetch(`/api/attendance?userId=${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          setAttendance(data);
        } else {
          setError('Failed to fetch attendance.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      }
    };

    fetchAttendance();
  }, [session]);

  const calculateMonthlyPercentage = () => {
    const currentMonth = new Date().getMonth();
    const monthlyRecords = attendance.filter(a => new Date(a.date).getMonth() === currentMonth);
    if (monthlyRecords.length === 0) return 0;
    const presentCount = monthlyRecords.filter(a => a.status === 'present').length;
    return (presentCount / monthlyRecords.length) * 100;
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">My Attendance</h2>
      <p>This Month's Attendance: {calculateMonthlyPercentage().toFixed(2)}%</p>
      
      <h3 className="text-lg font-semibold mt-4">Attendance History</h3>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul>
          {attendance.map(a => (
            <li key={a.id} className="p-2 border-b">
              <p>Date: {new Date(a.date).toLocaleDateString()}</p>
              <p>Status: {a.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}