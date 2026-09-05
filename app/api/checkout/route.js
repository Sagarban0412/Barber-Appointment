import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import Service from "@/models/serviceModel";
import Barber from "@/models/barberModel";
import Payment from "@/models/paymentModel";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, service, barber, date, time, notes } =
      await request.json();

    if (!name || !email || !service || !barber || !date || !time) {
      return NextResponse.json(
        { message: "Missing required booking fields" },
        { status: 400 },
      );
    }

    const [serviceRow, barberRow] = await Promise.all([
      Service.findById(service),
      Barber.findById(barber),
    ]);

    if (!serviceRow) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 },
      );
    }
    if (serviceRow.isActive === false) {
      return NextResponse.json(
        { message: "Service is not available" },
        { status: 400 },
      );
    }
    if (!barberRow) {
      return NextResponse.json(
        { message: "Barber not found" },
        { status: 404 },
      );
    }

    const amount = Math.round(serviceRow.price * 100);
    const currency = "inr";

    const payment = await Payment.create({
      amount,
      currency,
      customerEmail: email,
      customerName: name,
      serviceId: serviceRow._id,
      barberId: barberRow._id,
      appointmentDate: new Date(date),
      appointmentTime: time,
      notes: notes || "",
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: serviceRow.name,
              description: serviceRow.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/confirm?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${baseUrl}/checkout?status=cancelled`,
      metadata: {
        paymentId: payment._id.toString(),
      },
    });

    payment.sessionId = session.id;
    await payment.save();

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("checkout error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
