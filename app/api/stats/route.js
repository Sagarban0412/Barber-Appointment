import Appointment from "@/models/appointmentModel";
import Customer from "@/models/customerModel";
import Barber from "@/models/barberModel";
import "@/models/serviceModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const allAppointments = await Appointment.find()
      .populate("serviceId", "name price")
      .populate("barberId", "name");

    // revenue calculations
    const calcRevenue = (appointments) =>
      appointments.reduce((sum, a) => sum + (a.serviceId?.price || 0), 0);

    const todayAppointments = allAppointments.filter(
      (a) => new Date(a.appointmentDate) >= startOfToday
    );
    const weekAppointments = allAppointments.filter(
      (a) => new Date(a.appointmentDate) >= startOfWeek
    );
    const monthAppointments = allAppointments.filter(
      (a) => new Date(a.appointmentDate) >= startOfMonth
    );

    // popular services
    const serviceCount = {};
    allAppointments.forEach((a) => {
      const name = a.serviceId?.name;
      if (name) serviceCount[name] = (serviceCount[name] || 0) + 1;
    });
    const popularServices = Object.entries(serviceCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // barber performance
    const barberCount = {};
    const barberRevenue = {};
    allAppointments.forEach((a) => {
      const name = a.barberId?.name;
      if (name) {
        barberCount[name] = (barberCount[name] || 0) + 1;
        barberRevenue[name] = (barberRevenue[name] || 0) + (a.serviceId?.price || 0);
      }
    });
    const barberStats = Object.entries(barberCount).map(([name, appointments]) => ({
      name,
      appointments,
      revenue: barberRevenue[name] || 0,
    }));

    // monthly revenue chart (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthApps = allAppointments.filter((a) => {
        const date = new Date(a.appointmentDate);
        return date >= d && date < end;
      });
      monthlyRevenue.push({
        month: d.toLocaleString("default", { month: "short" }),
        revenue: calcRevenue(monthApps),
        appointments: monthApps.length,
      });
    }

    const [totalCustomers, totalBarbers] = await Promise.all([
      Customer.countDocuments(),
      Barber.countDocuments(),
    ]);

    return NextResponse.json({
      overview: {
        totalRevenue: calcRevenue(allAppointments),
        totalAppointments: allAppointments.length,
        todayRevenue: calcRevenue(todayAppointments),
        todayAppointments: todayAppointments.length,
        weekRevenue: calcRevenue(weekAppointments),
        weekAppointments: weekAppointments.length,
        monthRevenue: calcRevenue(monthAppointments),
        monthAppointments: monthAppointments.length,
        totalCustomers,
        totalBarbers,
        completedAppointments: allAppointments.filter((a) => a.status === "completed").length,
        cancelledAppointments: allAppointments.filter((a) => a.status === "cancelled").length,
      },
      popularServices,
      barberStats,
      monthlyRevenue,
      recentAppointments: allAppointments.slice(0, 5),
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
