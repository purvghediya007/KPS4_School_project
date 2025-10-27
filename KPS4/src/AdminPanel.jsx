/* eslint-disable no-unused-vars */
// src/AdminPanel.jsx
import React, { useState } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Footer from "./footer";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [activeTab, setActiveTab] = useState("media");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [announcement, setAnnouncement] = useState("");
  const [announcementFile, setAnnouncementFile] = useState(null); // <-- Added state here

  const [achievementImage, setAchievementImage] = useState(null);
  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementText, setAchievementText] = useState(
    `Our school takes immense pride in the accomplishments of our students in academics, innovation, and extracurricular activities. Their success is a testament to their hard work, resilience, and the support of dedicated educators.
From science exhibitions to hackathons, sports tournaments to cultural events, our students have consistently excelled at the state and national levels. These achievements reflect not just talent but a spirit of collaboration, curiosity, and continuous improvement.
We celebrate these victories as milestones on the path to becoming well-rounded leaders of tomorrow. Their stories continue to inspire others to dream big and achieve more.`
  );

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", "true");
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
  };

  const handleMediaUpload = async (e) => {
    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("files", file);
    }

    try {
      await axios.post("http://localhost:5000/api/media", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Media uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleAnnouncementSubmit = async () => {
    const formData = new FormData();
    formData.append("message", announcement);
    if (announcementFile) {
      formData.append("file", announcementFile); // optional file upload
    }

    try {
      await axios.post("http://localhost:5000/api/announcement", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Announcement posted successfully!");
      setAnnouncement("");
      setAnnouncementFile(null);
    } catch (err) {
      alert("Failed to post announcement");
    }
  };

  const handleAchievementSubmit = async () => {
    const formData = new FormData();
    formData.append("title", achievementTitle);
    formData.append("text", achievementText);
    if (achievementImage) formData.append("image", achievementImage);

    try {
      await axios.post("http://localhost:5000/api/achievements", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Achievement submitted successfully!");
    } catch (err) {
      alert("Failed to submit achievement");
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-12 bg-[#fff3f3] font-sans">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#b40000]">🛠 Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Tabs */}
            <div className="md:w-1/4 bg-[#fef6f6] border border-[#f0caca] rounded-lg p-4 shadow-sm space-y-3">
              {["media", "announcement", "achievement"].map((tab) => (
                <button
                  key={tab}
                  className={`w-full px-4 py-2 rounded-md border text-left ${
                    activeTab === tab
                      ? "bg-[#b40000] text-white"
                      : "bg-white text-[#b40000] border-[#ffdede]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "media"
                    ? "Media Gallery"
                    : tab === "announcement"
                    ? "Announcements"
                    : "Student Achievements"}
                </button>
              ))}
            </div>

            {/* Main Panel */}
            <div className="md:w-3/4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm">
              {activeTab === "media" && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[#b40000]">📷 Upload Media</h2>
                  <input
                    type="file"
                    multiple
                    className="mb-4"
                    onChange={handleMediaUpload}
                  />
                </div>
              )}

              {activeTab === "achievement" && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[#b40000]">
                    🎖 Update Student Achievements
                  </h2>

                  <input
                    type="text"
                    placeholder="Achievement Title"
                    className="w-full p-2 border rounded mb-4"
                    value={achievementTitle}
                    onChange={(e) => setAchievementTitle(e.target.value)}
                  />

                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows="8"
                    placeholder="Enter achievements content..."
                    value={achievementText}
                    onChange={(e) => setAchievementText(e.target.value)}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="mb-4"
                    onChange={(e) => setAchievementImage(e.target.files[0])}
                  />

                  <button
                    onClick={handleAchievementSubmit}
                    className="bg-[#b40000] text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>
              )}

              {activeTab === "announcement" && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[#b40000]">
                    📢 Add Announcement
                  </h2>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows="4"
                    placeholder="Write announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                  ></textarea>

                  <input
                    type="file"
                    accept="*/*"
                    className="mb-4"
                    onChange={(e) => setAnnouncementFile(e.target.files[0])} // <-- file input handler
                  />

                  <button
                    onClick={handleAnnouncementSubmit}
                    className="bg-[#b40000] text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
