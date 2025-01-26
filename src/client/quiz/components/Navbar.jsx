import React from "react";
import Logo from "../../../assets/logo.png"; // Pastikan path logo sudah benar

export default function Navbar() {
  return (
    <nav className="border-gray-200 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-2 py-2">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={Logo}
            alt="Careeer the Explorer"
            className="h-20 w-h-20 object-contain rounded-xl"
          />
        </div>
        {/* Text */}
        <span className="text-center text-xl md:text-2xl font-bold text-white tracking-wide flex-grow">
          Careeer the Explorer
        </span>
      </div>
    </nav>
  );
}
