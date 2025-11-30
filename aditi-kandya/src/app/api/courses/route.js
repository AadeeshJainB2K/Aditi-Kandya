
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req) {
  try {
    const { courseName, courseCode, department, credits, instructorId, description, meetingTime, location, maxStudents } = await req.json();

    const newCourse = await pool.query(
      "INSERT INTO Courses (CourseName, CourseCode, Department, Credits, InstructorID, Description, MeetingTime, Location, MaximumStudents) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [courseName, courseCode, department, credits, instructorId, description, meetingTime, location, maxStudents]
    );

    return NextResponse.json(newCourse.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Error creating course" }, { status: 500 });
  }
}
