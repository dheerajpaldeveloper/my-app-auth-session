"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function EditProfilePage() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false); 

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedId = localStorage.getItem("id") || "";

    console.log("Fetched from localStorage =>", { storedUsername, storedEmail, storedId });

    setUsername(storedUsername);
    setEmail(storedEmail);
    setId(storedId);
  }, []);

  // Handle form submission to update user
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // console.log("Updating user with:", { username, email, id });

    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, id }),
      });

      if (!res.ok) {
        console.error("Failed to update user.");
        return;
      }
      // localStorage.setItem("username", data.data.username);
      // localStorage.setItem("email", data.data.email);
      // localStorage.setItem("role", data.data.role);
      // localStorage.setItem("id", data.data.id);
      // console.log("User updated successfully!",await res.json());

      // Clear fields after update
      setUsername("");
      setEmail("");
      setId("");

      // Redirect to users page
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle close button click
  const handleClose = () => {
    setIsOpen(false);
    router.push("/users");
  };

  return (
    <>
      {isOpen && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleUpdate}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
