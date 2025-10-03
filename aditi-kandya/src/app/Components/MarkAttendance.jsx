'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MarkAttendance() {
  const { data: session } = useSession();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      if (!session) return;
      try {
        const userRes = await fetch('/api/users');

        if (userRes.ok) {
          const userData = await userRes.json();
          setStudents(userData.filter(u => u.role === 'student'));
        } else {
          setError('Failed to fetch students.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      }
    };
    fetchStudents();
  }, [session]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const today = new Date().toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

    try {
      for (const studentId in attendance) {
        const status = attendance[studentId];
        const res = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: parseInt(studentId),
            date: today,
            status: status,
          }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to mark attendance');
        }
      }
      setSuccess('Attendance marked successfully!');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while marking attendance.');
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">Mark Attendance for Today</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-semibold mt-4">Students</h3>
          {students.map(student => (
            <div key={student.id} className="flex items-center justify-between p-2 border-b">
              <p>{student.name}</p>
              <div>
                <label className="mr-2">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    value="present"
                    onChange={() => handleAttendanceChange(student.id, 'present')}
                  /> Present
                </label>
                <label className="mr-2">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    value="absent"
                    onChange={() => handleAttendanceChange(student.id, 'absent')}
                  /> Absent
                </label>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Submit Attendance</button>
      </form>
    </div>
  );
}