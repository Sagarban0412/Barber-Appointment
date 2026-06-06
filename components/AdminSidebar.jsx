"use client";

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
import axios from "axios";
import { useRouter } from "next/navigation";

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
    {
      name: "Sale Reports",
      link: "/admin/dashboard/sales",
      icon: <BarChart />,
    },
    { name: "Logout", link: "", icon: <LogOut /> },
  ];

  const router = useRouter();

  //logout functionality
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    try {
      await axios.post("/api/logout");

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const [isActive, setIsActive] = useState("Dashboard");
  return (
    <div className="w-64 bg-black text-white h-screen hidden md:flex flex-col fixed top-0 left-0 z-40">
      <div className="flex items-center h-20 border-b border-gray-700 px-6 gap-2 font-bold text-2xl text-center">
        <Scissors size={40} className="text-red-500" />
        <h1>Barber Shop</h1>
      </div>
      <div>
        {sidebarItems.map((item, index) =>
          item.name === "Logout" ? (
            <button
              key={index}
              onClick={handleLogout}
              className="flex w-full items-center gap-2 p-4 text-left hover:bg-red-400"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ) : (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-2 p-4 ${
                isActive === item.name ? "bg-red-400" : ""
              }`}
              onClick={() => setIsActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
