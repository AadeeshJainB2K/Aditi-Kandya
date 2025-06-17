"use client";
import Header from "../components/header/header";
import Image from "next/image";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Beginner Piano Fundamentals",
      description: "Learn basic techniques, music theory, and simple pieces",
      duration: "8 weeks",
      level: "Beginner",
      image: "/images/beginner-course.jpg",
    },
    {
      id: 2,
      title: "Intermediate Classical Repertoire",
      description:
        "Master works by Bach, Mozart, and Beethoven and many Other Legends",
      duration: "12 weeks",
      level: "Intermediate",
      image: "/images/intermediate-course.jpg",
    },
    {
      id: 3,
      title: "Advanced Performance Mastery",
      description: "Prepare for competitions and professional performances",
      duration: "16 weeks",
      level: "Advanced",
      image: "/images/advanced-course.jpg",
    },
    {
      id: 4,
      title: "Jazz Piano Improvisation",
      description: "Develop your jazz vocabulary and improvisation skills",
      duration: "10 weeks",
      level: "Intermediate+",
      image: "/images/jazz-course.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {" "}
      {/* Added pt-20 to account for fixed header */}
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Piano Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning programs tailored to your musical journey
          </p>
        </section>

        {/* Courses Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {course.title}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {course.duration}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "Aditi's structured approach helped me progress faster than I
                ever imagined. The beginner course gave me a solid foundation."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <Image
                    src="/images/student1.jpg"
                    alt="Student"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Emily R.</h4>
                  <p className="text-sm text-blue-600">Beginner Course</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "The jazz improvisation course completely transformed my
                playing. I can now confidently improvise over any standard."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <Image
                    src="/images/student2.jpg"
                    alt="Student"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">David L.</h4>
                  <p className="text-sm text-blue-600">Jazz Course</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join one of our courses today and take your piano skills to the next
            level
          </p>
          <a
            href="/contact"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Contact for Enrollment
          </a>
        </section>
      </main>
    </div>
  );
}
