'use client';

import { useState, useEffect } from 'react';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/api/users?role=teacher');
        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }
        const data = await response.json();
        setTeachers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Teachers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Salary Status</th>
              <th className="py-2 px-4 border-b">Classes Taken</th>
              <th className="py-2 px-4 border-b">Classes Missed</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="py-2 px-4 border-b">{teacher.name}</td>
                <td className="py-2 px-4 border-b">{teacher.email}</td>
                <td className="py-2 px-4 border-b">-</td> 
                <td className="py-2 px-4 border-b">-</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
