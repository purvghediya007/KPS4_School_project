// src/components/Footer.jsx
import React from "react";
import logo from "./assets/logo.jpg";
import {
  faInstagram,
  faYoutube,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const teamMembers = [
  { name: "Purv", linkedin: "https://www.linkedin.com/in/janedoe" },
    { name: "Amit Ahir", linkedin: "https://www.linkedin.com/in/amitahir0201" },

  { name: "deep", linkedin: "https://www.linkedin.com/in/johnsmith" },
    { name: "Nischal", linkedin: "https://www.linkedin.com/in/amitahir0201" },
      { name: "dhruvil", linkedin: "https://www.linkedin.com/in/amitahir0201" },


];

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm md:text-base">
        {/* Rest of your footer content remains exactly the same */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left: Logo + Name + Social */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
            <p className="font-semibold text-center md:text-left">
              Vishwakarma Government Engineering College, Ahmedabad
            </p>

            {/* New Team Members Section */}
            {/* <div className="mt-4 text-center md:text-left">
              <h5 className="font-semibold mb-2">Team Members</h5>
              <ul className="space-y-1">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-yellow-200 transition-transform duration-300 hover:scale-105"
                    >
                      {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="flex space-x-4 text-xl mt-2">
              <a href="#" className="transition-transform transform hover:scale-110">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
            
             <div className="mt-6 text-center md:text-left border-t border-yellow-300 pt-4 max-w-xs md:max-w-full mx-auto md:mx-0">
  {/* Clickable College Name */}
  <p>
      <h5 className="text-yellow-300 font-bold text-lg mt-3 mb-1 tracking-wide uppercase">
    Site Created By
  </h5>
    <a
      href="https://www.google.com/maps?q=Vishwakarma+Government+Engineering+College+Chandkheda+382424"
      target="_blank"
      rel="noopener noreferrer"
      className="text-yellow-300 font-semibold hover:text-yellow-400 transition-colors duration-300"
    >
      Vishwakarma Govt Engg College, Chandkheda
    </a>
  </p>

  {/* Site Created By Title */}

  {/* Small subtitle below title */}
  <p className="text-xs text-yellow-200 font-light mb-3">
    Developed and maintained by our dedicated team
  </p>

  {/* Team Members List */}
  <ul className="space-y-1">
    {teamMembers.map((member) => (
      <li key={member.name}>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300 hover:underline"
        >
          {member.name}
        </a>
      </li>
    ))}
  </ul>
</div>


          </div>

          {/* Middle: Contact + Links + Location */}
{/* Middle: Contact + Links + Location */}
<div className="flex flex-col space-y-6 items-center text-center">
  {/* Contact */}
  <div className="flex flex-col items-center text-center">
    <h4 className="font-bold mb-1 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faEnvelope} /> CONTACT
    </h4>
    <p>
      <a
        href="mailto:est@vgecg.ac.in"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        est@vgecg.ac.in
      </a>
    </p>
    <p>
      <a
        href="mailto:sts@vgecg.ac.in"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        sts@vgecg.ac.in
      </a>
    </p>
    <p className="italic">(admission / academics queries)</p>
  </div>

  {/* Phone */}
  <div className="flex flex-col items-center text-center">
    <h4 className="font-bold mb-1 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faPhone} /> PHONE NO.
    </h4>
    <p>
      <a
        href="tel:+917923293866"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        (079) 23293866
      </a>
    </p>
  </div>

  {/* Links */}
  <div className="flex flex-col items-center text-center">
    <h4 className="font-bold mb-1 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faLink} /> LINKS
    </h4>
    <p>
      <a
        href="https://vgecg.ac.in/campusmap"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        Campus Map
      </a>
    </p>
    <p>
      <a
        href="https://vgecg.ac.in/disclosures"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        Disclosures
      </a>
    </p>
    <p>
      <a
        href="https://vgecg.ac.in/important-links"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        Important Links
      </a>
    </p>
  </div>

  {/* Location */}
  <div className="flex flex-col items-center text-center">
    <h4 className="font-bold mb-1 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faLocationDot} /> LOCATION
    </h4>
    <p>
      <a
        href="https://www.google.com/maps?q=Vishwakarma+Government+Engineering+College+Chandkheda+382424"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-200 transform transition-transform duration-300 hover:scale-105"
      >
        Nr. Visat three roads, Sabarmati–Koba highway,
        <br />
        Chandkheda, Ahmedabad-382424
      </a>
    </p>
  </div>
</div>


          {/* Right: Google Map */}
          <div className="w-full md:w-[350px] h-[250px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="VGEC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.0851964006255!2d72.5919914751021!3d23.09317807912888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84fca2e40c91%3A0x6c2e4aef58c164d!2sVishwakarma%20Government%20Engineering%20College!5e0!3m2!1sen!2sin!4v1693321952100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
