"use client"; // 👈 Required for using hooks and browser APIs

import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "username", password: "password" }),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }

        const result = await res.json();
        console.log("result data : ", result.data[0].username); // ✅ Log the API response
        setData(result); // ✅ Save the API response
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

    const handleEdit = () => {
      // Handle edit action here
      console.log("Edit button clicked");
    };
    const handleDelete = () => {
      // Handle delete action here
      console.log("Delete button clicked");
    };

  return (
    <div className="flex flex-col ml-6 mt-6">
      <h1 className="text-xl font-bold mb-4">User Page</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {data ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.username}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={handleEdit}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <MdOutlineModeEditOutline size={20} />
                        </button>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                          <MdDeleteForever size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
}
