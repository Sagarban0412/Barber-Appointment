import { connectDB } from "@/lib/db";
import Admin from "@/models/adminModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { name, password } = await request.json();
  {
    /*console.log(name + " "+ password)*/
  }
  try {
    await connectDB();
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const checkPassword = await bcrypt.compare(password, admin.password);
    // console.log(checkPassword);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "invalid Password" },
        { status: 401 },
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "Server misconfiguration" }, { status: 500 });
    }
    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    const response = NextResponse.json(
      { message: "Login Successful" },
      {
        status: 200,
      },
    );

    response.cookies.set("loginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    console.log("Login Successfully");
    return response;
  } catch (error) {
    console.error("Error Logging:", error);
    return new Response(JSON.stringify({ message: "Failed to login " }), {
      status: 500,
    });
  }
}
