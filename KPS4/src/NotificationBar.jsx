import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NotificationBar() {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcement");

      if (res.data.length > 0) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestAnnouncement(sorted[0].message);
      } else {
        setLatestAnnouncement(null);
      }
    } catch (err) {
      console.error("Error fetching notification", err);
      setLatestAnnouncement(null);
    }
  };

  return (
   <div
  className="flex items-center border border-red-700 bg-red-100 hover:bg-red-200 cursor-pointer 
             h-14 font-sans  sm:my-1.5 rounded-md w-full max-w-full overflow-hidden"
  onClick={() => navigate("/announcements")}
>
  <div
    className="bg-red-700 text-white px-4 sm:px-6 w-32 sm:w-48 text-center font-semibold 
               flex items-center justify-center rounded-l-md"
    style={{ height: "100%" }}
  >
    🔔 Notification
  </div>

  {latestAnnouncement ? (
    <marquee className="flex-1 px-2 sm:px-4 text-xs sm:text-base text-red-900 font-medium truncate">
      {latestAnnouncement}
    </marquee>
  ) : (
    <div className="flex-1 px-2 sm:px-4 text-xs sm:text-base text-red-900 font-medium truncate">
      📢 Announcements & Updates
    </div>
  )}
</div>

  );
}
