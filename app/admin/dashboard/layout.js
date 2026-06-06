import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export const metadata = {
  title: "Admin Dashboard",
  description: "This is the admin dashboard layout",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full md:ml-64">
        <AdminHeader />
        <main className="p-3 md:p-6">{children}</main>
      </div>
    </div>
  );
}
