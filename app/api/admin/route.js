import { connectDB } from "@/lib/db";
import Admin from "@/models/adminModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, password } = await request.json();
  try {
    await connectDB();
    const admin = await Admin.findOne({ name });
    const checkPassword = await bcrypt.compare(password, admin.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "invalid Password" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { message: "Login Successful" },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return new Response(JSON.stringify({ message: "Failed to create admin" }), {
      status: 500,
    });
  }
}
