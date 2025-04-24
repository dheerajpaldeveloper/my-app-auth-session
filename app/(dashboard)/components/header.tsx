import React from 'react'
import { FiSidebar } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";


export default function header() {
  return (
    <div className="flex justify-between align-middle py-4 px-4 bg-white shadow-sm">
      <h2><FiSidebar size={25}/></h2>
      <h2><FaRegUserCircle size={25}/></h2>
    </div>
  )
}
