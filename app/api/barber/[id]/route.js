import { connectDB } from "@/lib/db";
import Barber from "@/models/barberModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const barber = await Barber.findById(id);
    if (!barber) {
      return NextResponse.json({ message: "Barber not found" }, { status: 404 });
    }
    return NextResponse.json({ barber });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const barber = await Barber.findByIdAndDelete(id);
    if (!barber) {
      return NextResponse.json(
        { message: "Barber not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Barber deleted", barber });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, email, specialty, workingHours } = await request.json();
    const barber = await Barber.findByIdAndUpdate(
      id,
      { name, email, specialty, workingHours },
      { new: true },
    );
    return NextResponse.json({ message: "Barber updated", barber });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { satatus: 500 });
  }
}
