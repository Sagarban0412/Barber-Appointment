import { connectDB } from "@/lib/db";
import Service from "@/models/serviceModel";
import "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().populate("category", "name");
    if (services.length === 0) {
      return NextResponse.json(
        { message: "No services found" },
        { status: 404 },
      );
    }
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, price, description, duration, category } =
      await request.json();
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return NextResponse.json(
        { message: "Service already exists" },
        { status: 400 },
      );
    }
    const newService = await Service.create({
      name,
      price,
      description,
      duration,
      category,
    });
    return NextResponse.json(
      { message: "Service created successfully", newService },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
