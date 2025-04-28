"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // menu ke liye ref

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("username 1: ",username)
    setUsername(username);
  }, []);

  // use for click anywhere to close user icon  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = async () => {
    const res = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }
    window.location.href = "/login"; // Force a full page reload
  };

  const handleProfile = () => {
    console.log("profile page");

    window.location.href = "/profile";
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 bg-white shadow-sm">
      <h2>
        <FiSidebar size={25} />
      </h2>
      <div className="relative" ref={menuRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaRegUserCircle size={25} />
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md p-3 z-50 text-sm">
            <p className="mb-2 px-2 font-medium">Hello, {username}</p>
            <button
              onClick={handleProfile}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={logOut}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
