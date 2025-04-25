"use client";
import React, { useEffect, useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

export default function header() {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  return (
    <div className="flex justify-between align-middle py-4 px-4 bg-white shadow-sm">
      <h2>
        <FiSidebar size={25} />
      </h2>
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaRegUserCircle size={25} />
          <span className="text-sm"></span>
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md p-3 z-50 text-sm">
            <p className="mb-2 font-medium">Hello, {username}</p>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              Profile
            </button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
