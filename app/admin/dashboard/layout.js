import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AdminSidebar from "@/components/AdminSidebar";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "This is the admin dashboard layout",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <AdminSidebar />
          <div className="w-full">
            <div className="flex justify-between items-center h-18 shadow-xl px-6">
              <div className="flex items-center justify-evenly flex-1 md:flex-none">
                <Menu className="block md:hidden" />
                <h1 className="font-bold text-sm md:text-2xl">
                  Dashboard Overview
                </h1>
              </div>
              <span className="h-5 w-5 rounded-full bg-gray-500 p-6"></span>
            </div>
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
