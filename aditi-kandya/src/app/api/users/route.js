import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import pool from '../../../lib/db';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  // Ensure the user is an admin or owner to access this route
  if (!session || !['admin', 'owner', 'ADMIN'].includes(session.user.role)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');

  if (!role) {
    return new NextResponse(JSON.stringify({ error: 'Role parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT id, name, email, role FROM users WHERE role = $1';
      const result = await client.query(query, [role]);
      return NextResponse.json(result.rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}