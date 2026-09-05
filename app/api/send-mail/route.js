import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(request) {
  const formData = await request.json();
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    await sendOtpEmail({
      to: formData.email,
      name: formData.name,
      otp,
      subject: "Booking Confirmation",
    });
    return NextResponse.json({ message: "Email sent successfully", otp });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}