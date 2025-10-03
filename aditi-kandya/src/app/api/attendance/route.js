import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import pool from '../../../lib/db';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !['admin', 'teacher'].includes(session.user.role)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { user_id, date, status } = await req.json();

    if (!user_id || !date || !status) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await pool.connect();
    try {
      // Use an ON CONFLICT clause to handle updates if a record for the user and date already exists
      const result = await client.query(
        `INSERT INTO attendance (user_id, date, status)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, date)
         DO UPDATE SET status = EXCLUDED.status
         RETURNING *`,
        [user_id, date, status]
      );
      return NextResponse.json(result.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error marking attendance:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const date = searchParams.get('date');

  try {
    const client = await pool.connect();
    try {
      let query = 'SELECT a.id, a.date, a.status, u.name as student_name FROM attendance a JOIN users u ON a.user_id = u.id';
      const params = [];

      if (userId) {
        query += ' WHERE u.id = $1';
        params.push(userId);
      } else if (date) {
        query += ' WHERE a.date = $1';
        params.push(date);
      }
      
      query += ' ORDER BY a.date DESC';

      const result = await client.query(query, params);
      return NextResponse.json(result.rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}