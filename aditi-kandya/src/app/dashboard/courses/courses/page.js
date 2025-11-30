
"use client";

import { useState } from "react";

export default function CreateCoursePage() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [credits, setCredits] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [description, setDescription] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName,
          courseCode,
          department,
          credits,
          instructorId,
          description,
          meetingTime,
          location,
          maxStudents,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      setSuccess(true);
      // Clear form
      setCourseName("");
      setCourseCode("");
      setDepartment("");
      setCredits("");
      setInstructorId("");
      setDescription("");
      setMeetingTime("");
      setLocation("");
      setMaxStudents("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4">Course created successfully!</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="courseName" className="block font-medium">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="courseCode" className="block font-medium">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block font-medium">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="credits" className="block font-medium">
            Credits
          </label>
          <input
            type="number"
            id="credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="instructorId" className="block font-medium">
            Instructor ID
          </label>
          <input
            type="number"
            id="instructorId"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="meetingTime" className="block font-medium">
            Meeting Time
          </label>
          <input
            type="text"
            id="meetingTime"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="maxStudents" className="block font-medium">
            Maximum Students
          </label>
          <input
            type="number"
            id="maxStudents"
            value={maxStudents}
            onChange={(e) => setMaxStudents(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
