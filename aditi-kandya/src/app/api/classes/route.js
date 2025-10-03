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
    const { name, description, scheduled_at } = await req.json();
    const teacher_id = session.user.id;

    if (!name || !scheduled_at) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO classes (teacher_id, name, description, scheduled_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [teacher_id, name, description, scheduled_at]
      );
      return NextResponse.json(result.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating class:', error);
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
  const teacherId = searchParams.get('teacherId');

  try {
    const client = await pool.connect();
    try {
      let query = 'SELECT c.id, co.name, co.description, c.scheduled_at, u.name as teacher_name FROM classes c JOIN users u ON c.teacher_id = u.id JOIN courses co ON c.course_id = co.id';
      const params = [];

      if (teacherId) {
        query += ' WHERE c.teacher_id = $1';
        params.push(teacherId);
      }
      
      query += ' ORDER BY c.scheduled_at DESC';

      const result = await client.query(query, params);
      return NextResponse.json(result.rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
