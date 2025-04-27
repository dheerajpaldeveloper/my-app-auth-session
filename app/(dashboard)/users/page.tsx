"use client"; // 👈 Required for using hooks and browser APIs

import React, { use, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

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
        //filter logic
        
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  //  for create user
  const handleCreate = async () => {
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        console.error("Error creating user");
      } else {
        console.log("User created successfully");
        setIsVisible(false);
        setUsername("");
        setEmail("");
        setPassword("");
        const user = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "username", password: "password" }),
        });
        const userData = await user.json();
        setData(userData);
        setUsername('');
        setEmail('');
        console.log("User data: ", userData);
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  //  for edit user
  const handleEdit = async (item: any) => {
    console.log("Edit item: ", item);
    setIsUpdate(!isUpdate);
    setUsername(item.username);
    setEmail(item.email);
    setId(item.id);

   
  };

  //for update api
  const handleUpdate = async () => {

    console.log("Update item: ", username,email,id);
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          id: id
        }),
      });
      if (!res.ok) {
        console.error("user not edit");
      }else{
        console.log("user edit")
        setIsUpdate(false);
        try {
          const user = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "username", password: "password" }),
          });
          const userData = await user.json();
          setData(userData);
          setUsername('');
          setEmail('');

          console.log("User data: ", userData);
        }
        catch (error) {
          console.error("Error creating user: ", error);
        }
      }
    } catch (error) {
      console.error("Error creating user: ", error);
      
    }
        
      }

  //  for delete user
  const handleDelete = async (item: any) => {
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: item.username,
          email: item.email,
          password: item.password,
        }),
      });

      if (!res.ok) {
        console.error("Error creating user");
      } else {
        console.log("user deleted successfully");
        const user = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await user.json();
        setData(userData);
        setUsername('');
        setEmail('');
        console.log("User data: ", userData);
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <div
      className={`flex flex-col ml-6 mt-6 ${
        isVisible ? "backdrop-blur-lg bg-white/30" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4 mr-4">
        <h1 className="text-xl font-bold mb-4">User Page</h1>
        <button
          onClick={() => setIsVisible(true)} // 👈 Just open form
          className="text-sm text-white font-medium bg-blue-500 p-2 rounded-sm hover:bg-blue-700"
        >
          Create User
        </button>
      </div>

      {isVisible && (
        <form
          className="fixed inset-0 flex items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className="bg-white p-4 rounded shadow">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold mb-2">Create User</h2>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="right-2 text-gray-500 hover:text-gray-700"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded p-1 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-1 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-1 w-full"
                  required
                />
              </label>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="text-sm text-white font-medium bg-blue-500 p-2 rounded-sm hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Edit Form */}
      {isUpdate && (
                      <form
                        className="fixed inset-0 flex items-center justify-center"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate();
                        }}
                      >
                        <div className="bg-white p-4 rounded shadow">
                          <div>
                            <div className="flex items-center justify-between">
                              <h2 className="text-lg font-bold mb-2">
                               Edit User
                              </h2>
                              <button
                                type="button"
                                onClick={() => setIsUpdate(false)}
                                className="right-2 text-gray-500 hover:text-gray-700"
                              >
                                <IoMdClose size={24} />
                              </button>
                            </div>

                            <label className="block mb-2">
                              Username:
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border rounded p-1 w-full"
                                required
                              />
                            </label>
                            <label className="block mb-2">
                              Email:
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded p-1 w-full"
                                required
                              />
                            </label>
                            <div className="flex justify-end mt-4">
                              <button
                                type="submit"
                                className="text-sm text-white font-medium bg-blue-500 p-2 rounded-sm hover:bg-blue-700"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

      {error && <p className="text-red-500">Error: {error}</p>}

      {data ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <table className="w-full border border-green-900 rounded-4xl">
            <thead>
              <tr>
                <th className="border border-green-900 px-4 py-2">ID</th>
                <th className="border border-green-900 px-4 py-2">Username</th>
                <th className="border border-green-900 px-4 py-2">Email</th>
                <th className="border border-green-900 px-4 py-2">
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item: any) => (
                <tr key={item.id}>
                  <td className="border border-green-900 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-green-900 px-4 py-2">
                    {item.username}
                  </td>
                  <td className="border border-green-900 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-green-900 px-4 py-2">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <MdOutlineModeEditOutline size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
}
