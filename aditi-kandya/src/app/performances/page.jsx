"use client";
import Header from "../components/header/header";
import Image from "next/image";

export default function Performances() {
  const performances = [
    {
      id: 1,
      title: "Night Changes Cover",
      type: "youtube",
      url: "https://www.youtube.com/embed/OS6xBu-GDv4?si=jyw8KunbbAe0Jr8H",
      date: "June 2023",
      venue: "Royal Concert Hall, London",
    },
    {
      id: 2,
      title: "Chopin Nocturne in E-flat Major",
      type: "image",
      url: "/images/performance1.jpg",
      date: "March 2023",
      venue: "Paris Conservatoire",
    },
    {
      id: 3,
      title: "Mozart Piano Concerto No. 21",
      type: "video",
      url: "/videos/performance1.mp4",
      date: "December 2022",
      venue: "Berlin Philharmonie",
    },
    {
      id: 4,
      title: "Debussy Clair de Lune",
      type: "youtube",
      url: "https://www.youtube.com/embed/OS6xBu-GDv4?si=jyw8KunbbAe0Jr8H",
      date: "September 2022",
      venue: "Vienna Musikverein",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Performances
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my recent piano performances and recordings
          </p>
        </section>
        {/* Performance Gallery */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {performances.map((performance) => (
            <div
              key={performance.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {performance.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Date:</span> {performance.date}
                  <br />
                  <span className="font-medium">Venue:</span>{" "}
                  {performance.venue}
                </p>

                {/* Media Display */}
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  {performance.type === "youtube" ? (
                    <iframe
                      src={performance.url}
                      className="w-full h-64"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={performance.title}
                    ></iframe>
                  ) : performance.type === "video" ? (
                    <video
                      controls
                      className="w-full h-64 object-cover"
                      poster="/images/video-thumbnail.jpg"
                    >
                      <source src={performance.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative h-64">
                      <Image
                        src={performance.url}
                        alt={performance.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* Upload Section (for admin)
        <section className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Upload New Performance
          </h2>
          <form className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Performance title"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Performance venue"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Media Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select media type</option>
                <option value="image">Image</option>
                <option value="video">Video File</option>
                <option value="youtube">YouTube Link</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Media Content</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="YouTube URL or file path"
              />
              <input
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                accept="image/*, video/*"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Upload Performance
            </button>
          </form>
        </section> */}
        {/* Call to Action */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Book a Performance?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact me for concert bookings, private events, or collaborations
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
            Contact Me
          </button>
        </section>
      </main>
    </div>
  );
}
