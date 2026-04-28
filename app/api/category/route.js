import { connectDB } from "@/lib/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const category = await Category.find();
    if (category.length === 0) {
      return NextResponse.json({ message: "No categories found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name } = await request.json();
    const category = await Category.create({ name });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
