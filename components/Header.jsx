"use client";
import { Menu, Scissors, Moon, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBook = () => {
    router.push('/book');
  };
  
  return (
    <>
      <div className="flex justify-between items-center h-10 px-3 md:px-6 lg:px-10 xl:px-20 py-6 relative bg-white dark:bg-gray-900 transition-colors">
        <div className="flex items-center gap-1 lg:gap-3 cursor-pointer">
          <Scissors className="text-red-400" size={30} />
          <h1 className="font-semibold text-sm lg:text-xl text-gray-900 dark:text-white">
            <Link href={'/'}>Barber-Shop</Link>
          </h1>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-5 md:gap-7 lg:gap-10">
          <Link href={"/gallary"} className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors">Gallery</Link>
          <Link href={"/services"} className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors">Services</Link>
          <Link href={"/about"} className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors">About</Link>
          <Link href={"/contact"} className="text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors">Contact</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="bg-red-500 py-2 rounded-2xl cursor-pointer w-32 text-white hover:bg-red-600 transition-colors" onClick={handleBook}>
            Book Now
          </button>
        </div>
        <div className="sm:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Menu onClick={handleMenu} className="cursor-pointer text-gray-700 dark:text-gray-300" />
          {isOpen && (
            <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-50 min-w-full p-6 border dark:border-gray-700 shadow-lg">
              <div className="flex flex-col gap-4">
                <Link href={"/gallary"} className="hover:text-red-400 transition-colors py-2" onClick={handleMenu}>
                  Gallery
                </Link>
                <Link href={"/services"} className="hover:text-red-400 transition-colors py-2" onClick={handleMenu}>
                  Services
                </Link>
                <Link href={"/about"} className="hover:text-red-400 transition-colors py-2" onClick={handleMenu}>
                  About
                </Link>
                <Link href={"/contact"} className="hover:text-red-400 transition-colors py-2" onClick={handleMenu}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
