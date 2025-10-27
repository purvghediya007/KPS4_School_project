import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SchoolAchievements() {
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/achievements/latest")
      .then(res => setAchievement(res.data))
      .catch(err => console.error("Failed to fetch latest achievement:", err));
  }, []);

  return (
<div className="w-full min-h-[50vh] px-4 py-8 sm:px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-800 break-words">
        Student Achievements
      </h1>

      {!achievement || !achievement.title ? (
        <p className="text-center text-gray-500 text-base sm:text-lg break-words">
          No achievements available yet.
        </p>
      ) : (
<div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 mb-6 md:mb-12 min-w-0 break-words">
          {/* LEFT: Image */}
          <div className="w-full md:w-1/2 px-2 sm:px-0">
            <img
              src={`http://localhost:5000/uploads/${achievement.image}`}
              alt={achievement.title}
              className="rounded-lg shadow-xl w-full max-w-full object-cover border border-gray-300"
            />
          </div>

          {/* RIGHT: Text */}
          <div className="w-full md:w-1/2 text-justify px-2 sm:px-0 break-words">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">{achievement.title}</h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
              {achievement.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
