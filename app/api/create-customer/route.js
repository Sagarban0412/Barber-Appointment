import Customer from "@/models/customerModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "name and email are required" },
        { status: 400 },
      );
    }

    const customer = await Customer.findOneAndUpdate(
      { email },
      {
        $inc: { visited: 1 },
        $setOnInsert: { name, email },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }, // upsert is a operations that either update an existing record or insert a new one if it does not exist,
    );

    const isNew = customer.visited === 1;

    return NextResponse.json(
      {
        message: isNew ? "customer created" : "customer updated",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating customer:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
