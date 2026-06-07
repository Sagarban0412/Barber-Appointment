import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("customerToken")?.value;
  if (!token) {
    return new NextResponse({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return new NextResponse.json({ message: "Authorized" }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 500 },
    );
  }
}
