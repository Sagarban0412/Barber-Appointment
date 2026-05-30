import Appointment from "@/models/appointmentModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await request.json();
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Appointment updated", appointment });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Appointment deleted" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
