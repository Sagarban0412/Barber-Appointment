import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";
import Customer from "@/models/customerModel";
import { connectDB } from "@/lib/db";
import { sendOtpEmail } from "@/lib/mailer";

const OTP_TTL_MS = 5 * 60 * 1000;
const COOKIE_MAX_AGE = 60 * 60 * 24;

function hashOtp(otp) {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(String(otp))
    .digest("hex");
}

function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

export async function GET() {
  const token = (await cookies()).get("customerToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Authorized" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    if (otp) {
      // Phase 2: verify OTP, mint token
      const customer = await Customer.findOne({ email }).select(
        "+verifyOtpHash +verifyOtpExpires",
      );

      if (!customer) {
        return NextResponse.json(
          { message: "No account found with that email" },
          { status: 404 },
        );
      }

      const isExpired =
        !customer.verifyOtpExpires || customer.verifyOtpExpires < new Date();
      const storedHash = customer.verifyOtpHash;

      if (!storedHash || isExpired) {
        return NextResponse.json(
          { message: "Invalid or expired OTP" },
          { status: 401 },
        );
      }

      const submittedHash = hashOtp(otp);
      if (!timingSafeEqualHex(storedHash, submittedHash)) {
        return NextResponse.json(
          { message: "Invalid or expired OTP" },
          { status: 401 },
        );
      }

      // Clear OTP fields, mint token
      customer.verifyOtpHash = undefined;
      customer.verifyOtpExpires = undefined;
      await customer.save();

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const response = NextResponse.json(
        { message: "Token created" },
        { status: 200 },
      );
      response.cookies.set("customerToken", token, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        path: "/",
        secure: true,
      });
      return response;
    }

    // Phase 1: send OTP
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return NextResponse.json(
        { message: "No account found with that email" },
        { status: 404 },
      );
    }

    const generatedOtp = crypto.randomInt(100000, 1000000);
    customer.verifyOtpHash = hashOtp(generatedOtp);
    customer.verifyOtpExpires = new Date(Date.now() + OTP_TTL_MS);
    await customer.save();

    await sendOtpEmail({
      to: email,
      name: customer.name,
      otp: generatedOtp,
      subject: "Your verification code",
    });

    return NextResponse.json(
      { status: "otp_sent", message: "OTP sent to your email" },
      { status: 200 },
    );
  } catch (error) {
    console.error("customer/verify error:", error);
    return NextResponse.json(
      { message: "Internal error" },
      { status: 500 },
    );
  }
}
