"use client"

import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const AdminHeader = () => {
    const[isOpen,setIsOpen] = useState(false)
  return (
    <>
    {isOpen && (
        <div className="fixed inset-0 flex w-3/4  justify-end bg-black/50 z-50 px-4 py-2">
            <X className="flex items-center justify-end p-2 bg-white rounded-full" onClick={()=>setIsOpen(false)} size={40}/>
        </div>
    )}
      <div className="flex justify-between items-center h-18 shadow-xl px-2">
        <div className="flex items-center justify-between px-5 flex-1 md:flex-none">
          <Menu className="block md:hidden" onClick={()=>setIsOpen(true)} />
          <h1 className="font-bold text-sm md:text-2xl flex-1 text-center">
            Dashboard Overview
          </h1>
        </div>
        <span className="h-5 w-5 rounded-full bg-gray-500 p-6"></span>
      </div>
    </>
  );
};

export default AdminHeader;
