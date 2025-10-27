import React, { useState, useRef, useEffect } from "react";
import logo from "./assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Brand Icons
import {
  faInstagram,
  faYoutube,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

// Hamburger & Close
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const facilitiesRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (facilitiesRef.current && !facilitiesRef.current.contains(event.target)) {
        setFacilitiesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 bg-red-700 text-white shadow-md z-50">
      {/* Mobile & Desktop Wrapper */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 pt-3 md:px-10 space-y-2 md:space-y-0">

        {/* Top Row: Logo + School Name + Hamburger */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-3 text-white">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold">PM Shri KPS4</span>
              <p className="text-xs md:text-sm">
                Ahmedabad, Kalol near Koba Road 39283
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <FontAwesomeIcon
                icon={mobileMenuOpen ? faTimes : faBars}
                className="text-2xl"
              />
            </button>
          </div>
        </div>

        {/* Second Row: Social Media Icons */}
        <div className="flex space-x-2 justify-center md:justify-end w-full md:w-auto pt-1">
          <a href="https://facebook.com" className="bg-white w-9 aspect-square p-2 rounded-full hover:bg-red-300 transition duration-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600 hover:scale-125 transition-transform duration-300" />
          </a>
          <a href="https://instagram.com" className="bg-white w-9 aspect-square p-2 rounded-full hover:bg-red-300 transition duration-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faInstagram} className="text-pink-600 hover:scale-125 transition-transform duration-300" />
          </a>
          <a href="https://linkedin.com" className="bg-white w-9 aspect-square p-2 rounded-full hover:bg-red-300 transition duration-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faLinkedin} className="text-blue-800 hover:scale-125 transition-transform duration-300" />
          </a>
          <a href="https://twitter.com" className="bg-white w-9 aspect-square p-2 rounded-full hover:bg-red-300 transition duration-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faTwitter} className="text-black hover:scale-125 transition-transform duration-300" />
          </a>
          <a href="https://youtube.com" className="bg-white w-9 aspect-square p-2 rounded-full hover:bg-red-300 transition duration-300 flex items-center justify-center">
            <FontAwesomeIcon icon={faYoutube} className="text-red-600 hover:scale-125 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 py-4 bg-red-700 text-base font-semibold">
          <li>
            <NavLink
              to="/"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              About Us
            </NavLink>
          </li>
          <li className="relative group">
            <span
              onClick={() => setFacilitiesOpen(!facilitiesOpen)}
              className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center cursor-pointer"
            >
              Facilities
            </span>

            <ul
              ref={facilitiesRef}
              className={`absolute top-full left-0 mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50 transition duration-300
                ${facilitiesOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                group-hover:opacity-100 group-hover:visible`}
            >
              <NavLink
                to="/facilities/sciencelab"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Science Lab
              </NavLink>
              <NavLink
                to="/facilities/mathlab"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Math Lab
              </NavLink>
              <NavLink
                to="/facilities/computer"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Computer Lab
              </NavLink>
              <NavLink
                to="/facilities/library"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Library
              </NavLink>
              <NavLink
                to="/facilities/smartclass"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Smart Class
              </NavLink>
              <NavLink
                to="/facilities/middaymeal"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Mid-Day Meal
              </NavLink>
              <NavLink
                to="/facilities/goverment"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Government Scholarship
              </NavLink>
              <NavLink
                to="/facilities/divyangroom"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Divyang Resource Room
              </NavLink>
              <NavLink
                to="/facilities/playground"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Playground
              </NavLink>
              <NavLink
                to="/facilities/transportation"
                onClick={toggleMobileMenu}
                className="hover:underline block px-4 py-2"
              >
                Transportation
              </NavLink>
            </ul>
          </li>
          <li>
            <NavLink
              to="/events"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/media"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              Media Gallary
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/announcements"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              Announcements & Updates
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              onClick={toggleMobileMenu}
              className="hover:underline"
            >
              AdminePanel
            </NavLink>
          </li>
        </ul>
      )}

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-end items-center pr-1 space-x-7 font-bold text-sm md:text-base uppercase py-1 relative">
        {/* Home */}
        <li>
          <NavLink
            to="/"
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            Home
          </NavLink>
        </li>

        {/* About Us */}
        <li>
          <NavLink
            to="/about"
            className="px-2 py-2 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            About Us
          </NavLink>
        </li>

        {/* Facilities Dropdown */}
        <li className="relative" ref={facilitiesRef}>
          <span
            onClick={() => setFacilitiesOpen(!facilitiesOpen)}
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center cursor-pointer select-none"
          >
            Facilities
          </span>
          <ul
            className={`absolute top-full left-0 mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50 transition duration-300
              ${facilitiesOpen ? "opacity-100 visible" : "opacity-0 invisible"}
              group-hover:opacity-100 group-hover:visible`}
          >
            <NavLink
              to="/facilities/sciencelab"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Science Lab
            </NavLink>
            <NavLink
              to="/facilities/mathlab"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Math Lab
            </NavLink>
            <NavLink
              to="/facilities/computer"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Computer Lab
            </NavLink>
            <NavLink
              to="/facilities/library"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Library
            </NavLink>
            <NavLink
              to="/facilities/smartclass"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Smart Class
            </NavLink>
            <NavLink
              to="/facilities/middaymeal"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Mid-Day Meal
            </NavLink>
            <NavLink
              to="/facilities/goverment"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Government Scholarship
            </NavLink>
            <NavLink
              to="/facilities/divyangroom"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Divyang Resource Room
            </NavLink>
            <NavLink
              to="/facilities/playground"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Playground
            </NavLink>
            <NavLink
              to="/facilities/transportation"
              className="block px-4 py-2 w-full hover:bg-gray-100"
            >
              Transportation
            </NavLink>
          </ul>
        </li>

        {/* Other menu items */}
        <li>
          <NavLink
            to="/events"
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/media"
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            Media Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/announcements"
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            Announcements & Updates
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin"
            className="px-2 py-1 rounded-md transition duration-300 hover:bg-white/15 space-x-1 flex items-center"
          >
            AdminPanel
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
