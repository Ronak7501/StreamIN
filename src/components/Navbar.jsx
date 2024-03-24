import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  const navigate  = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function provided as a prop
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="sticky top-0  bg-white py-[0.6rem] px-4 lg:px-10 flex items-center justify-between z-20">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <img src={logo} alt="" className="w-10 h-10" />
        <div className="">
          <p className="font-bold text-[#9147ff]">StreamIN</p>
        </div>
      </div>
      
      <div className="flex items-center gap-5 ">
        {user ? (
          <div className="bg-gray-300 py-1 px-2 rounded-[0.4rem]">
            <div className="font-semibold">{user.username}</div>
          </div>
        ) : (
          <>
            <div className="bg-gray-300 py-1 px-2 rounded-[0.4rem]">
              <div className="font-semibold">
                <Link to="/login">Sign in</Link>
              </div>
            </div>
            <div className="bg-[#9147ff] py-1 px-2 rounded-[0.4rem]">
              <div className="text-white font-semibold">
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </>
        )}
        {user && (
          <button onClick={handleLogoutClick} className="bg-red-500 text-white py-1 px-2 rounded-[0.4rem]">Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
