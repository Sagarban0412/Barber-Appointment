import Admin from "@/models/adminModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const { name, password } = await req.json();
    const adminExist = await Admin.findOne({ name });

    if (adminExist) {
      return NextResponse.json(
        { message: "Admin already exist" },
        { status: 404 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      password: hashPassword,
    });

    return NextResponse.json(
      {
        message: "Admin create successfully",
        admin: {
          id: newAdmin._id,
          name: newAdmin.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create admin",
      },
      { status: 500 },
    );
  }
}
