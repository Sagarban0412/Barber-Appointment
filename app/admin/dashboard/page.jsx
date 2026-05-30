"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Scissors,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
  CalendarDays,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StatCard = ({ title, value, icon, sub }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
    <div className="p-3 bg-red-50 rounded-full text-red-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  </div>
);

const page = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("total");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        Loading dashboard...
      </div>
    );

  if (!stats)
    return (
      <div className="flex items-center justify-center h-96 text-red-400">
        Failed to load stats.
      </div>
    );

  const {
    overview,
    popularServices,
    barberStats,
    monthlyRevenue,
    recentAppointments,
  } = stats;

  const revenueKey = {
    total: "totalRevenue",
    today: "todayRevenue",
    week: "weekRevenue",
    month: "monthRevenue",
  };
  const appointmentKey = {
    total: "totalAppointments",
    today: "todayAppointments",
    week: "weekAppointments",
    month: "monthAppointments",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["today", "week", "month", "total"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm capitalize ${
                filter === f
                  ? "bg-red-400 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue"
          value={`Rs.${overview[revenueKey[filter]]}`}
          icon={<IndianRupee size={22} />}
          sub={`${filter} earnings`}
        />
        <StatCard
          title="Appointments"
          value={overview[appointmentKey[filter]]}
          icon={<CalendarDays size={22} />}
          sub={`${filter} bookings`}
        />
        <StatCard
          title="Total Customers"
          value={overview.totalCustomers}
          icon={<Users size={22} />}
        />
        <StatCard
          title="Total Barbers"
          value={overview.totalBarbers}
          icon={<Scissors size={22} />}
        />
        <StatCard
          title="Completed"
          value={overview.completedAppointments}
          icon={<CheckCircle size={22} />}
        />
        <StatCard
          title="Cancelled"
          value={overview.cancelledAppointments}
          icon={<XCircle size={22} />}
        />
        <StatCard
          title="Total Appointments"
          value={overview.totalAppointments}
          icon={<CalendarCheck size={22} />}
        />
        <StatCard
          title="Total Revenue"
          value={`Rs.${overview.totalRevenue}`}
          icon={<TrendingUp size={22} />}
        />
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Revenue (Last 6 Months)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(val) => `Rs.${val}`} />
            <Bar dataKey="revenue" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Popular Services
          </h2>
          <div className="space-y-3">
            {popularServices.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{s.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-red-400 h-2 rounded-full"
                      style={{
                        width: `${(s.count / popularServices[0].count) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-6">
                    {s.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Barber Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Barber Performance
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barber</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barberStats.map((b, i) => (
                <TableRow key={i}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.appointments}</TableCell>
                  <TableCell>Rs.{b.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Appointments
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Barber</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAppointments.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.customerId}</TableCell>
                <TableCell>{a.serviceId?.name ?? "—"}</TableCell>
                <TableCell>{a.barberId?.name ?? "—"}</TableCell>
                <TableCell>
                  {new Date(a.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{a.appointmentTime}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      a.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : a.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </TableCell>
                <TableCell>Rs.{a.serviceId?.price ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
