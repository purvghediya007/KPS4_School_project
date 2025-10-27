import React, { useState } from "react";
import NavBar from "./navbar";
import slide1 from "./assets/slide1.jpg";

import Footer from "./footer";

const tabs = [
  { id: 1, title: "Special Divyang Room at a Glance" },
  { id: 2, title: "Special Divyang Room Detail" },
];

const SpecialDivyangPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full pt-24 pb-16 px-4 md:px-12 bg-[#fff3f3] font-sans">
        <div className="w-full bg-white rounded-xl shadow-xl p-6 md:p-10 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#b40000] mb-8 border-b pb-4">
            ♿ Special Divyang Resource Room
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Panel - Tabs */}
            <div className="md:w-1/4 bg-[#fef6f6] border border-[#f0caca] rounded-lg p-5 shadow-sm h-[160px] flex flex-col justify-start">
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
                    Special Divyang Room at a Glance
                  </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {[
    slide1,
    "divyang2.jpg",
    "divyang3.jpg",
    "divyang4.jpg",
  ].map((img, i) => (
    <div
      key={i}
      className="relative group h-48 w-full border rounded shadow overflow-hidden"
      style={{ minWidth: '280px', maxWidth: '400px' }}
    >
      <img
        src={img}
        alt={`Divyang ${i + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <p className="absolute bottom-[-2rem] left-0 right-0 text-center text-white font-semibold text-lg opacity-0 transition-all duration-500 group-hover:bottom-2 group-hover:opacity-100">
        Facility {i + 1}
      </p>
    </div>
  ))}
</div>

                </>
              )}

              {activeTab.id === 2 && (
                <>
                  <h2 className="text-2xl font-extrabold text-[#b40000] mb-6">
                    📝 Special Divyang Room Detail
                  </h2>
                  <div className="bg-gradient-to-br from-[#fff8f8] to-[#ffeaea] p-6 rounded-lg shadow-md border border-[#f5d1d1]">
                    <p className="text-gray-800 leading-relaxed text-lg mb-4">
                      The{" "}
                      <span className="font-semibold text-[#b40000]">
                        Special Divyang Resource Room
                      </span>{" "}
                      provides inclusive education support for differently-abled students.
                    </p>
                    <ul className="list-none space-y-3 text-gray-700 text-base">
                      <li className="flex items-start gap-3">
                        <span className="text-[#b40000] font-bold text-lg">
                          🛠️
                        </span>
                        Equipped with assistive technologies and customized
                        furniture for accessibility.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#b40000] font-bold text-lg">
                          👩‍🏫
                        </span>
                        Staff trained to offer guidance, care, and learning
                        support.
                      </li>
                    </ul>
                    <p className="mt-6 text-gray-800 italic text-base">
                      "Accessibility is the key to equal opportunity — this room
                      ensures every student can learn with dignity."
                    </p>
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

export default SpecialDivyangPage;
