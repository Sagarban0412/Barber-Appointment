import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json(
    {
      message: "Logout Successfully",
    },
    { status: 200 },
  );

  response.cookies.set("loginToken","",{
    expires:new Date(0),
    path:"/"
  })

  return response
}
