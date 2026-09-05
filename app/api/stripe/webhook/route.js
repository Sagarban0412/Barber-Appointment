export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import Payment from "@/models/paymentModel";
import Appointment from "@/models/appointmentModel";
import Customer from "@/models/customerModel";

export async function POST(request) {
  const sig = request.headers.get("stripe-signature");
  const raw = await request.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Webhook signature error: ${err.message}` },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await connectDB();
      const payment = await Payment.findOne({ sessionId: session.id });
      if (!payment) {
        return NextResponse.json({ received: true });
      }

      if (payment.status !== "paid") {
        await Customer.findOneAndUpdate(
          { email: payment.customerEmail },
          {
            $inc: { visited: 1 },
            $setOnInsert: {
              name: payment.customerName,
              email: payment.customerEmail,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        const appointment = await Appointment.create({
          customerId: payment.customerEmail,
          serviceId: payment.serviceId,
          barberId: payment.barberId,
          appointmentDate: payment.appointmentDate,
          appointmentTime: payment.appointmentTime,
          status: "booked",
        });

        payment.paymentIntent = session.payment_intent ?? null;
        payment.status = "paid";
        payment.appointmentId = appointment._id;
        await payment.save();
      }
    }

    if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const session = event.data.object;
      await connectDB();
      await Payment.findOneAndUpdate(
        { sessionId: session.id, status: { $ne: "paid" } },
        { $set: { status: "failed" } },
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("webhook handler error:", err);
    return NextResponse.json(
      { message: err.message || "Webhook handler failed" },
      { status: 500 },
    );
  }
}
