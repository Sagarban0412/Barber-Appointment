import { connectDB } from "@/lib/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const category = await Category.find();
    if (category.length <= 0) {
      return new NextResponse(
        JSON.stringify({ message: "No category found" }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  const { name } = await request.json();
  try {
    const category = await Category.create({ name });
    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
