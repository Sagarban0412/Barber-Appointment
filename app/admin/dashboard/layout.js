import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AdminSidebar from "@/components/AdminSidebar";
import { Menu } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";

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
          <div className="w-full md:ml-64">
            <AdminHeader/>
            <main className="p-3 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
