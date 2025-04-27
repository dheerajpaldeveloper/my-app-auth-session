"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function page() {
  // const[isUpdate, setIsUpdate] = useState(true)
  // const[username, setUsername] = useState('')
  // const[email, setEmail] = useState('')

  const handleUpdate = (item: any) => {
    item.preventDefault();
    console.log("submit item", item);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleUpdate}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button
            type="button"
            // onClick={() => setIsUpdate(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>
  
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
  
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
