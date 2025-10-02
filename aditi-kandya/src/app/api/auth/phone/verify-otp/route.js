import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export async function POST(req) {
  try {
    const { phoneNumber, otp } = await req.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json({ message: 'Phone number and OTP are required' }, { status: 400 });
    }

    // In a real application, you would verify the OTP against the one stored.
    // For this example, we'll assume the OTP is correct.

    const client = await pool.connect();

    // Check if user already exists
    const result = await client.query('SELECT * FROM users WHERE phone_number = $1', [phoneNumber]);

    if (result.rows.length === 0) {
      // If user doesn't exist, create a new one
      await client.query('INSERT INTO users (phone_number, auth_provider) VALUES ($1, $2)', [phoneNumber, 'phone']);
    }

    client.release();

    // Here you would typically create a session for the user.
    // For now, we'll just return a success message.

    return NextResponse.json({ message: 'User logged in successfully' });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
