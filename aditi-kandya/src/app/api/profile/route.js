
// THIS FILE WAS MODIFIED BY GEMINI TO FIX AN IMPORT ERROR
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { gender, phoneNumber, age, address } = await req.json();
  const email = session.user.email;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE users SET gender = $1, "phoneNumber" = $2, age = $3, address = $4 WHERE email = $5 RETURNING *',
      [gender, phoneNumber, parseInt(age), address, email]
    );
    client.release();

    if (result.rows.length > 0) {
      return new Response(JSON.stringify(result.rows[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update profile" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
