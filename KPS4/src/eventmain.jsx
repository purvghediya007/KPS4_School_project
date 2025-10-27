import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Footer from "./footer";

const years = [2025, 2026];
const events = Array.from({ length: 39 }, (_, i) => ({
  id: i + 1,
  name: `Event ${i + 1}`,
  description: `This is a short description for Event ${i + 1}.`,
}));

export default function EventMain() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [mediaByEvent, setMediaByEvent] = useState({});
  const adminLoggedIn = localStorage.getItem("isAdmin") === "true";

  // For image modal
  const [modalImage, setModalImage] = useState(null);
  const lastTapRef = useRef(null);

  const fetchMediaForAllEvents = async () => {
    const allMedia = {};
    for (let event of events) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/events/${selectedYear}/${event.id}`
        );
        const data = res.data;
        allMedia[event.id] =
          data && Array.isArray(data.images) && Array.isArray(data.videos)
            ? data
            : { images: [], videos: [] };
      } catch (error) {
        allMedia[event.id] = { images: [], videos: [] };
      }
    }
    setMediaByEvent(allMedia);
  };

  useEffect(() => {
    fetchMediaForAllEvents();
  }, [selectedYear]);

  const handleUpload = async (file, type, eventId) => {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("year", selectedYear);
    formData.append("type", type);

    try {
      await axios.post(
        `http://localhost:5000/api/events/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchMediaForAllEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/media/${mediaId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchMediaForAllEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete media");
    }
  };

  // Double tap/click handler for images
  const handleImageTap = (imageUrl) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // milliseconds
    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      setModalImage(imageUrl);
      lastTapRef.current = null;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <>
      <NavBar />

      <div className="pt-15 px-4 min-h-screen">
        <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-300 h-[85vh] flex flex-col">
          {/* Year Selector */}
          <div className="px-4 py-2 border-b border-gray-200">
            <div className="text-sm font-medium text-red-700 mb-2">
              Select Year:
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex gap-3">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium shadow-sm transition-colors duration-200
            ${
              selectedYear === year
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-red-700 border-gray-300 hover:bg-red-100"
            }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Event Cards Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-full">
            {events.map((event) => {
              const media = mediaByEvent[event.id] || {
                images: [],
                videos: [],
              };
              return (
                <div
                  key={event.id}
                  className="w-full sm:px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col items-center p-4 sm:p-6 bg-gray-50 border rounded-xl shadow-sm"
                >
                  <h1 className="text-3xl font-bold text-red-700 mb-2 tracking-wide">
                    {event.name}
                  </h1>

                  {/* Description */}
                  <p className="text-base text-gray-700 text-center mb-6 w-full max-w-3xl px-2 sm:px-4">
                    {event.description}
                  </p>

                  {/* Images + Videos Wrapper (Responsive Flex) */}
                  <div className="w-full flex flex-col lg:flex-row gap-6 px-2 sm:px-4">
                    {/* Images Section */}
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold mb-2 text-red-700">
                        📷 Images
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        {media.images.length > 0 ? (
                          media.images.map(({ _id, imageUrl }, idx) => (
                            <div key={_id || idx} className="relative group">
                              <img
                                src={`http://localhost:5000/uploads/${imageUrl}`}
                                alt={`Event Image ${idx + 1}`}
                                className="w-full h-60 object-cover rounded-lg shadow hover:scale-105 hover:shadow-red-300 transition-transform duration-300"
                                onClick={() => handleImageTap(imageUrl)}
                                onTouchEnd={() => handleImageTap(imageUrl)}
                                style={{ touchAction: "manipulation" }} // to improve touch handling
                              />

                              {adminLoggedIn && (
                                <button
                                  onClick={() => handleDelete(_id)}
                                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Delete Image"
                                >
                                  🗑
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-full text-center">
                            No images available.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Videos Section */}
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold mb-2 text-red-700">
                        🎥 Videos
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        {media.videos.length > 0 ? (
                          media.videos.map(({ _id, imageUrl }, idx) => (
                            <div key={_id || idx} className="relative group">
                              <video
                                controls
                                className="w-full h-60 object-cover rounded-lg shadow hover:scale-105 hover:shadow-red-300 transition-transform duration-300"
                                src={`http://localhost:5000/uploads/${imageUrl}`}
                              />
                              {adminLoggedIn && (
                                <button
                                  onClick={() => handleDelete(_id)}
                                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Delete Video"
                                >
                                  🗑
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-full text-center">
                            No videos available.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upload Form */}
                  {adminLoggedIn && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const photo = e.target.photo.files[0];
                        const video = e.target.video.files[0];
                        if (photo) handleUpload(photo, "photo", event.id);
                        if (video) handleUpload(video, "video", event.id);
                        e.target.reset();
                      }}
                      className="flex flex-col items-center gap-3 w-full max-w-md mt-6"
                    >
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="border p-2 rounded w-full"
                      />
                      <input
                        type="file"
                        name="video"
                        accept="video/*"
                        className="border p-2 rounded w-full"
                      />
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition-all"
                      >
                        Upload Media
                      </button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking on image container
          >
            <img
              src={`http://localhost:5000/uploads/${modalImage}`}
              alt="Full size"
              className="max-w-screen max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-red-700 transition-colors select-none"
              title="Close full size image"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
