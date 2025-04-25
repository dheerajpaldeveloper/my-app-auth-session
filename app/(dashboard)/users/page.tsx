"use client"; // 👈 Required for using hooks and browser APIs

import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'username', password: 'password'}),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }

        const result = await res.json();
        console.log("result : ",result); // ✅ Log the API response
        setData(result); // ✅ Save the API response
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col ml-6 mt-6">
      <h1 className="text-xl font-bold mb-4">User Page</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {data ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Welcome, {data.data.username}</h2>
          {/* <pre className="mt-2 text-sm text-gray-700">{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
}
