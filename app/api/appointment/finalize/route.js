import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/paymentModel";
import "@/models/appointmentModel";
import "@/models/serviceModel";
import "@/models/barberModel";

export async function GET(request) {
  try {
    const sessionId = new URL(request.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { message: "session_id required" },
        { status: 400 },
      );
    }

    await connectDB();
    const payment = await Payment.findOne({ sessionId }).populate({
      path: "appointmentId",
      populate: [
        { path: "serviceId", select: "name price duration" },
        { path: "barberId", select: "name" },
      ],
    });

    if (!payment) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    if (payment.status !== "paid") {
      return NextResponse.json(
        { message: "Payment not completed" },
        { status: 402 },
      );
    }
    if (!payment.appointmentId) {
      return NextResponse.json(
        { message: "Appointment not yet created" },
        { status: 425 },
      );
    }

    return NextResponse.json(
      {
        status: "paid",
        amount: payment.amount,
        currency: payment.currency,
        paymentIntent: payment.paymentIntent,
        appointment: payment.appointmentId,
        customer: {
          name: payment.customerName,
          email: payment.customerEmail,
        },
        notes: payment.notes,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("finalize error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to finalize" },
      { status: 500 },
    );
  }
}
