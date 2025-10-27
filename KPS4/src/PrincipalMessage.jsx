import React from "react";
import principalImage from "./assets/slide1.jpg"; // Replace with your actual image path

export default function PrincipalMessage() {
    return (
<section className="w-full h-auto max-h-[1000px] bg-gray-100 flex flex-col">            <div className="flex flex-col md:flex-row flex-grow min-w-0 overflow-hidden">
                {/* LEFT: Text */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-12 flex flex-col justify-center">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center md:text-left break-words">
                        Principal's Message
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-600">A Vision of Excellence</h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify break-words">
                        Welcome to our institution, where we foster a culture of learning,
                        discipline, and holistic development. As the Principal, I feel honored
                        to lead a team of passionate educators and enthusiastic learners who are
                        committed to academic excellence and character building.
                        <br /><br />
                        Our aim is to nurture curious minds, promote ethical values, and create
                        responsible citizens of tomorrow. We continuously strive to provide an
                        environment that inspires innovation, critical thinking, and creativity.
                        <br /><br />
                        I invite all students to actively participate in academics as well as
                        co-curricular activities, and make the most of the opportunities offered
                        here. Together, let's shape a brighter and empowered future.
                    </p>
                </div>

                {/* RIGHT: Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-4 sm:p-6 md:p-12">
                    <img
                        src={principalImage}
                        alt="Principal"
                        className="w-full max-w-xs sm:max-w-md object-cover rounded-lg shadow-lg border-4 border-red-200"
                    />
                </div>
            </div>
        </section>
    );
}
