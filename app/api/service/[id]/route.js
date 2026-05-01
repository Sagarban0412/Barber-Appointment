import { connectDB } from "@/lib/db";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, price, duration, description, category } = await request.json();
    const service = await Service.findByIdAndUpdate(
      id,
      { name, price, duration, description, category },
      { new: true },
    );
    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service updated", service });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted", service: deletedService });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
