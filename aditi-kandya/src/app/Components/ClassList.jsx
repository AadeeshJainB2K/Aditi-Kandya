'use client';

import { useState, useEffect } from 'react';

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes');
        if (res.ok) {
          const data = await res.json();
          setClasses(data);
        } else {
          setError('Failed to fetch classes.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      }
    };

    fetchClasses();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">Scheduled Classes</h2>
      {classes.length === 0 ? (
        <p>No classes scheduled.</p>
      ) : (
        <ul>
          {classes.map((c) => (
            <li key={c.id} className="p-2 border-b">
              <p className="font-bold">{c.title}</p>
              <p>{c.description}</p>
              <p>When: {new Date(c.scheduled_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
