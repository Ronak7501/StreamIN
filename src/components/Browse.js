import React from "react";
import { Link } from 'react-router-dom';

function MyButton() {
  const buttonElement = (
    <button className="text-white font-bold text-[30px] px-4">
      {/* Get Started */}
      <Link to="/dashboard" className="text-white font-bold text-[30px] px-4">
          Get Started
        </Link>
    </button>
  );

  return (
      <div className="flex items-center justify-center flex-col text-center">
        
      {/* Title */}
      <h1 className="text-[55px] font-bold pt-40">The easiest way to live stream</h1>
      <p className = "pt-5">Experience the thrill of real-time connection with our live streaming platform</p>
      <p className = "pb-5">Share your passions, connect with your audience, and broadcast your world effortlessly.</p>
      <div className="relative shadow-lg shadow-gray-400 rounded-full bg-[#9147ff] w-[11rem] sm:w-[15rem] h-[3rem] rounded-full">
      {buttonElement}
    </div>
    </div>
  );
}


export default MyButton;
