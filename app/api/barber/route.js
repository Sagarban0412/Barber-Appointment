import Barber from "@/models/barberModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const barbers = await Barber.find();
    if (barbers.length === 0) {
      return NextResponse.json({ message: "No barbers found" });
    }
    return NextResponse.json({ message: "Barbers:", barbers });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch barbers" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, specialty, workingHours } = await request.json();
    const isExist = await Barber.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        { message: "Barber already exists" },
        { status: 400 },
      );
    }
    const barber = await Barber.create({ name, email, specialty, workingHours });
    return NextResponse.json({
      message: "Barber created successfully",
      barber,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "failed to Create the Barber" },
      { status: 500 },
    );
  }
}

