// // src/MediaGallery.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NavBar from "./navbar";
// import Footer from "./footer";

// export default function MediaGallery() {
//   const [media, setMedia] = useState([]);
//   const [modalImage, setModalImage] = useState(null);

//   const fetchMedia = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/media");
//       setMedia(res.data);
//     } catch (err) {
//       console.error("Error fetching media", err);
//     }
//   };

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   const closeModal = (e) => {
//     if (e.target.classList.contains("modal-overlay") || e.key === "Escape") {
//       setModalImage(null);
//     }
//   };

//   React.useEffect(() => {
//     if (modalImage) {
//       window.addEventListener("keydown", closeModal);
//     } else {
//       window.removeEventListener("keydown", closeModal);
//     }
//     return () => window.removeEventListener("keydown", closeModal);
//   }, [modalImage]);

//   return (
//     <>
//       <NavBar />
//       <div className="max-w-full px-12 py-15 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen font-sans">
//         <div className="text-center mb-15 select-none">
//           <h1 className="text-7xl font-extrabold text-red-700 tracking-wider leading-tight drop-shadow-lg">
//             Media Gallery
//           </h1>
//           <p className="mt-3 text-gray-700 text-base italic font-medium">
//             Double click on any image to view it larger
//           </p>
//         </div>

//         {media.length === 0 ? (
//           <p className="text-center text-gray-500 text-2xl">No media available.</p>
//         ) : (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//             style={{
//               gridAutoRows: "320px",
//               borderTop: "3px solid #b91c1c", // Tailwind's red-700
//               borderLeft: "3px solid #b91c1c",
//             }}
//           >
//             {media.map((img, index) => (
//               <div
//                 key={index}
//                 onDoubleClick={() => setModalImage(img)}
//                 className="
//                   cursor-pointer
//                   group
//                   border-r-3 border-b-3 border-red-700
//                   p-2
//                   transition-shadow duration-500
//                   hover:shadow-2xl
//                   overflow-hidden
//                   rounded-xl
//                   bg-white
//                   hover:bg-red-50
//                   "
//               >
//                 <img
//                   src={`http://localhost:5000/${img.path.replace(/\\/g, "/")}`}
//                   alt={`Media ${index + 1}`}
//                   className="
//                     w-full
//                     h-full
//                     object-cover
//                     rounded-lg
//                     transition-transform ease-in-out duration-500
//                     group-hover:scale-105
//                     group-hover:brightness-95
//                     select-none
//                     shadow-sm
//                   "
//                   draggable={false}
//                   loading="lazy"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <Footer />

//       {modalImage && (
//         <div
//           className="modal-overlay fixed inset-0 bg-black bg-opacity-95 backdrop-blur-md flex items-center justify-center z-50 cursor-zoom-out"
//           onClick={closeModal}
//         >
//           <div
//             className="relative max-w-6xl max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setModalImage(null)}
//               className="
//                 absolute 
//                 top-5 
//                 right-5 
//                 flex 
//                 items-center 
//                 justify-center 
//                 w-16 
//                 h-16 
//                 bg-red-700 bg-opacity-80 
//                 rounded-full 
//                 text-white 
//                 text-6xl 
//                 font-extrabold 
//                 hover:bg-red-900 
//                 hover:scale-110
//                 transition 
//                 focus:outline-none
//                 select-none
//                 shadow-lg
//               "
//               aria-label="Close fullscreen image"
//             >
//               &times;
//             </button>

//             <img
//               src={`http://localhost:5000/${modalImage.path.replace(/\\/g, "/")}`}
//               alt="Fullscreen"
//               className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl select-none"
//               draggable={false}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// src/MediaGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navbar";
import Footer from "./footer";
export default function MediaGallery() {
  const [media, setMedia] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/media");
      setMedia(res.data);
    } catch (err) {
      console.error("Error fetching media", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <><NavBar/>
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-12">
        Media Gallery
      </h1>

      {media.length === 0 ? (
        <p className="text-center text-gray-500">No media available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {media.map((img, index) => (
            <div
              key={index}
              className="rounded overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/${img.path.replace(/\\/g, "/")}`}
                alt={`Media ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/></>
  );
}
