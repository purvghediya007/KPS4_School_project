import React, { useState } from "react";
import NavBar from "./navbar";
import slide1 from "./assets/slide1.jpg";
import slide2 from "./assets/slide2.jpg";


import Footer from "./footer";
const tabs = [
  { id: 1, title: "Library at a Glance" },
  { id: 2, title: "Description" },
  { id: 3, title: "Co-ordinators" },
];

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full pt-24 pb-16 px-4 md:px-12 bg-[#fff3f3] font-sans">
        <div className="w-full bg-white rounded-xl shadow-xl p-6 md:p-10 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#b40000] mb-8 border-b pb-4">
            📚 Library
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Panel - Tabs */}
<div className="md:w-1/4 bg-[#fef6f6] border border-[#f0caca] rounded-lg p-5 shadow-sm h-[190px] flex flex-col justify-start">
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

            {/* Right Panel - Content */}
            <div className="md:w-3/4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-300">
           {activeTab.id === 1 && (
  <>
    <h2 className="text-xl font-bold text-[#b40000] mb-4">
      Library at a Glance
    </h2>
   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {[
    { src: slide1, label: "Reading Hall" },
    { src: slide2, label: "Digital Zone" },
    { src: "lab3.jpg", label: "Reference Section" },
    { src: "lab4.jpg", label: "Stack Room" },
  ].map((item, index) => (
    <div
      key={index}
      className="relative group h-48 w-full border rounded shadow overflow-hidden"
      style={{ minWidth: '280px', maxWidth: '400px' }}
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <p
        className="absolute bottom-[-2rem] left-0 right-0 text-center text-white font-semibold text-lg opacity-0 transition-all duration-500 group-hover:bottom-2 group-hover:opacity-100"
      >
        {item.label}
      </p>
    </div>
  ))}
</div>

  </>
)}


             {activeTab.id === 2 && (
  <>
    <h2 className="text-2xl font-extrabold text-[#b40000] mb-6">
      📖 Library Description
    </h2>
    <div className="bg-gradient-to-br from-[#fff8f8] to-[#ffeaea] p-6 rounded-lg shadow-md border border-[#f5d1d1]">
      <p className="text-gray-800 leading-relaxed text-lg mb-4">
        The <span className="font-semibold text-[#b40000]">Central Library</span> stands as the intellectual heart of our institution, designed to inspire curiosity, encourage lifelong learning, and provide a welcoming space for academic excellence.
      </p>
      <ul className="list-none space-y-3 text-gray-700 text-base">
        <li className="flex items-start gap-3">
          <span className="text-[#b40000] font-bold text-lg">📚</span>
          A collection of <strong>20,000+</strong> books across diverse disciplines, regularly updated with the latest editions.
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#b40000] font-bold text-lg">💻</span>
          Fully equipped <strong>Digital Zone</strong> with e-books, research databases, and online journals.
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#b40000] font-bold text-lg">🛋️</span>
          Comfortable, noise-free <strong>Reading Hall</strong> that fosters focus and deep study.
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#b40000] font-bold text-lg">🌐</span>
          High-speed Wi-Fi and dedicated research assistance for faculty and students.
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#b40000] font-bold text-lg">📅</span>
          Regular <strong>workshops, guest lectures</strong>, and reading programs to enrich learning experiences.
        </li>
      </ul>
      <p className="mt-6 text-gray-800 italic text-base">
        "A library is not just a building full of books — it is a gateway to knowledge, imagination, and the future."
      </p>
    </div>
  </>
)}

            {activeTab.id === 3 && (
  <>
    <h2 className="text-xl font-bold text-[#b40000] mb-4">
      Library Co-ordinators
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-[#b40000] text-white">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Contact</th>
            <th className="py-2 px-4 border">Education</th>
            <th className="py-2 px-4 border">Experience</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-[#fff3f3]">
            <td className="py-2 px-4 border">Dr. Anjali Desai – Chief Librarian</td>
            <td className="py-2 px-4 border">
              <a
                href="mailto:anjali.desai@kps4.edu"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                anjali.desai@kps4.edu
              </a>
            </td>
            <td className="py-2 px-4 border">
              <a
                href="tel:+919876543210"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                +91 98765 43210
              </a>
            </td>
            <td className="py-2 px-4 border">PhD in Library Science</td>
            <td className="py-2 px-4 border">15 Years</td>
          </tr>
          <tr className="hover:bg-[#fff3f3]">
            <td className="py-2 px-4 border">Mr. Rohit Patel – Assistant Librarian</td>
            <td className="py-2 px-4 border">
              <a
                href="mailto:rohit.patel@kps4.edu"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                rohit.patel@kps4.edu
              </a>
            </td>
            <td className="py-2 px-4 border">
              <a
                href="tel:+919876543211"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                +91 98765 43211
              </a>
            </td>
            <td className="py-2 px-4 border">M.Lib.Sc</td>
            <td className="py-2 px-4 border">8 Years</td>
          </tr>
          <tr className="hover:bg-[#fff3f3]">
            <td className="py-2 px-4 border">Ms. Neha Mehta – Digital Resource Manager</td>
            <td className="py-2 px-4 border">
              <a
                href="mailto:neha.mehta@kps4.edu"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                neha.mehta@kps4.edu
              </a>
            </td>
            <td className="py-2 px-4 border">
              <a
                href="tel:+919876543212"
                className="text-black hover:text-yellow-500 transition-colors duration-200"
              >
                +91 98765 43212
              </a>
            </td>
            <td className="py-2 px-4 border">M.Sc (Information Technology)</td>
            <td className="py-2 px-4 border">6 Years</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
)}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibraryPage;
