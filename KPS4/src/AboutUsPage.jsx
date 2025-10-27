import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Footer from "./footer";
import slide1 from "./assets/slide1.jpg";

const tabs = [
  { id: 1, title: "School History" },
  { id: 2, title: "Teacher Info" },
  { id: 3, title: "Achievements by Year" },
];

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (activeTab.id === 3 && achievements.length === 0) {
      axios
        .get("http://localhost:5000/api/achievements")
        .then((res) => setAchievements(res.data))
        .catch((err) => console.error("Failed to fetch achievements:", err));
    }
  }, [activeTab, achievements.length]);

  const achievementsByYear = achievements.reduce((acc, ach) => {
    const year = new Date(ach.createdAt).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(ach);
    return acc;
  }, {});

  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => b - a);

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full pt-24 pb-16 px-4 md:px-12 bg-[#fff3f3] font-sans">
        <div className="w-full bg-white rounded-xl shadow-xl p-6 md:p-10 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#b40000] mb-8 border-b pb-4">
            🏫 About Us
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="md:w-1/4 bg-[#fef6f6] border border-[#f0caca] rounded-lg p-5 shadow-sm h-[240px] flex flex-col justify-start">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li
                    key={tab.id}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-4 py-2 rounded-md border hover:scale-[1.02] transition-transform duration-200 ${
                      activeTab.id === tab.id
                        ? "bg-[#b40000] text-white border-[#b40000]"
                        : "bg-white text-[#b40000] border-[#ffdede] hover:bg-[#ffecec]"
                    }`}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Area */}
            <div className="md:w-3/4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-300">
              {/* School History Tab */}
              {activeTab.id === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-[#b40000] mb-4">
                    📜 School History
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our school was founded in 1980 with the vision of empowering
                    students with knowledge, discipline, and values. Over the
                    years, we have grown into a respected institution known for
                    academic excellence, sports, and cultural achievements.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded shadow border group w-full h-48 md:h-48"
                        style={{ minWidth: '280px', maxWidth: '400px' }}
                      >
                        <img
                          src={slide1}
                          alt={`School History ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <p className="absolute bottom-[-2rem] left-0 right-0 text-center text-white font-semibold text-lg transition-all duration-300 group-hover:bottom-2">
                          Moment {i + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Info Tab */}
              {activeTab.id === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-[#b40000] mb-4">
                    👩‍🏫 Teacher Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Mrs. Rina Patel",
                        degree: "M.Sc, B.Ed",
                        experience: "12 years",
                        subject: "Mathematics",
                        achievements: "Best Teacher Award 2018",
                        email: "rina.patel@school.com",
                      },
                      {
                        name: "Mr. Arvind Shah",
                        degree: "M.A, B.Ed",
                        experience: "15 years",
                        subject: "English Literature",
                        achievements: "State Level Debate Coach",
                        email: "arvind.shah@school.com",
                      },
                      {
                        name: "Mrs. Meena Joshi",
                        degree: "B.Sc, B.Ed",
                        experience: "8 years",
                        subject: "Science",
                        achievements: "Published Science Journal Articles",
                        email: "meena.joshi@school.com",
                      },
                      {
                        name: "Mr. Rajesh Thakkar",
                        degree: "M.Com, B.Ed",
                        experience: "10 years",
                        subject: "Commerce",
                        achievements: "National Commerce Trainer",
                        email: "rajesh.thakkar@school.com",
                      },
                    ].map((teacher, i) => (
                      <div
                        key={i}
                        className="border rounded-lg p-4 shadow bg-[#fffefb] flex flex-col items-center h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <img
                          src={slide1}
                          alt={teacher.name}
                          className="w-36 h-36 object-cover rounded-full mb-3 border-2 border-[#b40000] shadow-md transform transition-transform duration-300 hover:scale-110"
                        />
                        <h3 className="text-lg font-semibold text-[#b40000]">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          🎓 {teacher.degree}
                        </p>
                        <p className="text-sm text-gray-700">
                          🧑‍🏫 {teacher.experience}
                        </p>
                        <p className="text-sm text-gray-700">
                          📚 {teacher.subject}
                        </p>
                        <p className="text-sm text-gray-700 text-center">
                          🏆 {teacher.achievements}
                        </p>
                        <a
                          href={`mailto:${teacher.email}`}
                          className="text-xs text-blue-600 mt-2 hover:underline"
                        >
                          📧 {teacher.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements by Year Tab */}
              {activeTab.id === 3 && (
                <div className="h-[500px] overflow-y-auto scrollbar-hide pr-2">
                  <h2 className="text-xl font-bold text-[#b40000] mb-6">
                    🏅 Achievements by Year
                  </h2>
                  {achievements.length === 0 ? (
                    <p className="text-gray-500 text-lg text-center">
                      No achievements available yet.
                    </p>
                  ) : (
                    sortedYears.map((year) => (
                      <div key={year} className="mb-10">
                        <h3 className="text-lg font-semibold text-[#b40000] border-b pb-2 mb-4">
                          📅 {year}
                        </h3>
                        <div className="space-y-6">
                          {achievementsByYear[year].map((ach, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col md:flex-row items-center gap-6 border rounded-lg p-4 shadow-sm bg-[#fffefb]"
                            >
                              <div className="md:w-1/3">
                                <img
                                  src={`http://localhost:5000/uploads/${ach.image}`}
                                  alt={ach.title}
                                  className="rounded-lg shadow w-full object-cover"
                                />
                              </div>
                              <div className="md:w-2/3 text-justify">
                                <h4 className="text-md font-bold text-red-600 mb-2">
                                  {ach.title}
                                </h4>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                  {ach.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
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

export default AboutUsPage;
