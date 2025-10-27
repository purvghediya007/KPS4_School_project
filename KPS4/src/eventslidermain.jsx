import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const events = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Event ${i + 1}`,
  description: `This is a short description for Event ${i + 1}.`,
}));

export default function EventSliderMain() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [eventMedia, setEventMedia] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: dir === "next" ? scrollLeft + clientWidth : scrollLeft - clientWidth,
        behavior: "smooth",
      });
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("next");
        }
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const fetchMedia = async () => {
    const media = {};
    await Promise.all(
      events.map(async (event) => {
        try {
          const res = await axios.get(`http://localhost:5000/api/events/2025/${event.id}`);
          media[event.id] = {
            images: res.data.images || [],
            videos: res.data.videos || [],
          };
        } catch (err) {
          media[event.id] = { images: [], videos: [] };
        }
      })
    );
    setEventMedia(media);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [isPaused]);

  return (
<div className="w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-14 drop-shadow-lg">
        Events
      </h1>

   <div
  ref={scrollRef}
  className="flex overflow-x-auto gap-8 scroll-smooth py-6 px-4 rounded-lg no-scrollbar w-full"
>
  {events.map((event) => (
    <div
      key={event.id}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-white shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl border border-red-300 
                 min-w-full sm:min-w-[380px] sm:max-w-[400px]" // ✅ Full width in mobile, fixed width in desktop
    >
      <Link to="/events" className="block p-4 space-y-6">
        {/* Event Title & Description */}
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">{event.name}</h2>
          <p className="text-gray-700 text-base">{event.description}</p>
        </div>

        {/* Photos Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">
            Photos
          </h3>
          <div>
            {eventMedia[event.id]?.images.length > 0 ? (
              <img
                src={`http://localhost:5000/uploads/${
                  eventMedia[event.id].images[0].imageUrl ||
                  eventMedia[event.id].images[0]
                }`}
                alt={`Event ${event.id} photo`}
                className="w-full h-48 object-cover rounded-md shadow-sm"
              />
            ) : (
              <div className="text-red-400 text-center border border-dashed py-6 border-red-300 rounded">
                No Photos
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

    </div>
  );
}

