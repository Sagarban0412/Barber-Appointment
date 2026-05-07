import Appointment from "@/models/appointmentModel";
import "@/models/serviceModel";
import "@/models/barberModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const appointments = await Appointment.find()
      .populate("serviceId", "name price duration")
      .populate("barberId", "name")
      .sort({ appointmentDate: -1 });
    return NextResponse.json({ appointments });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, service, barber, date, time } = await request.json();
    const newAppointment = await Appointment.create({
      customerId: email,
      serviceId: service,
      barberId: barber,
      appointmentDate: date,
      appointmentTime: time,
    });
    return NextResponse.json({ message: "Appointment created", appointment: newAppointment }, { status: 201 });
  } catch (e) {
    console.error("Appointment POST error:", e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}