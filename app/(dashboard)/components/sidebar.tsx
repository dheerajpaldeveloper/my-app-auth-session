import React from "react";
import { CiHome } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { LuGitPullRequestArrow } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";


export default function Sidebar() {
  return (
    <div className="h-screen p-4 shadow-md bg-gray-50">
      <h1 className="text-xl font-bold mb-4">Admin Portal</h1>
      <div className="flex flex-col gap-4">
        <a href="/" className="flex items-center gap-2">
          <CiHome size={23} />
          <span>Dashboard</span>
        </a>
        <a href="/users" className="flex items-center gap-2">
        <LuUsers size={23} />
        Users
        </a>
        <a href="/support" className="flex items-center gap-2">
        <LuGitPullRequestArrow size={23} />
        Support
        </a>
        <a href="/settings" className="flex items-center gap-2">
        <AiOutlineSetting size={23} />
        Setting
        </a>
      </div>
    </div>
  );
}
