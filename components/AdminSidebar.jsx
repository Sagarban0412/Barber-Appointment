"use client"

import {
  BarChart,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const AdminSidebar = () => {
  const sidebarItems = [
    { name: "Dashboard", link: "/admin/dashboard", icon: <LayoutDashboard /> },
    {
      name: "Appointments",
      link: "/admin/dashboard/appointments",
      icon: <CalendarDays />,
    },
    { name: "Services", link: "/admin/dashboard/services", icon: <Scissors /> },
    { name: "Barbers", link: "/admin/dashboard/barbers", icon: <User2 /> },
    { name: "Settings", link: "/admin/dashboard/settings", icon: <Settings /> },
    { name: "Sale Reports", link: "/admin/dashboard/sales", icon: <BarChart /> },
    { name: "Logout", link: "/admin/dashboard/logout", icon: <LogOut /> },
  ];

  const [isActive, setIsActive] = useState("Dashboard");
  return (
    <div className="w-1/5 bg-black  text-white h-screen hidden md:block">
      <div className="flex items-center h-20 border-b border-gray-700 px-6 gap-2 font-bold text-2xl text-center">
        <Scissors size={40} className="text-red-500" />
        <h1>Barber Shop</h1>
      </div>
      <div>
        {sidebarItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={`flex items-center gap-2 p-4 ${isActive === item.name ? "bg-red-400" : ""}`}
            onClick={()=>setIsActive(item.name)}
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
