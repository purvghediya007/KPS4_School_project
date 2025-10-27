import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Footer from "./footer";
import { FaDownload, FaClock } from "react-icons/fa";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcement");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-20">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8 drop-shadow-md">
          📢 Announcements & Updates
        </h1>

        {/* Full-width scrollable announcements */}
       {/* Full-width scrollable announcements */}
{/* Full-width scrollable announcements */}
<div
  className="w-4/5 mx-auto flex-grow overflow-y-auto space-y-5"
  style={{
    maxHeight: "calc(100vh - 200px)", // leaves room for navbar + footer
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  }}
>
  {/* Hide scrollbar for Chrome/Safari */}
  <style>
    {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>

  {announcements.length === 0 ? (
    <p className="text-center text-gray-500 italic">
      No announcements available.
    </p>
  ) : (
    announcements.map((item, idx) => (
      <div
        key={idx}
        className="bg-white/80 border border-gray-200 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-transform transform hover:scale-[1.02] hover:shadow-2xl"
      >
        <p className="text-gray-900 text-xl font-semibold leading-snug">
          {item.message}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <FaClock className="text-gray-400" />
          Posted on:{" "}
          <span className="font-medium">
            {new Date(item.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>

        {item.fileUrl && (
          <a
            href={item.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 hover:shadow-md transition"
          >
            <FaDownload /> Download File
          </a>
        )}
      </div>
    ))
  )}
</div>

      </div>

      <Footer />
    </div>
  );
}
