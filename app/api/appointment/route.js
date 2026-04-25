import Appointment from "@/models/appointmentModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        return NextResponse.json({message:"Working"},{status:200})
    }catch(e){
        return new NextResponse("Failed to fetch appointments", { status: 500 });
    }
}

export async function POST(request){
    try{
        await connectDB();
        const { name, email, service, barber, date, time, status } = await request.json();
        const newAppointment = new Appointment({
            customerId: email,
            serviceId: service,
            barberId: barber,
            appointmentDate: date,
            appointmentTime: time,
            status: status || "pending",
        });
        await newAppointment.save();
        return NextResponse.json(newAppointment, { status: 201 });
    }catch (e){
        console.error("Appointment POST error:", e.message);
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}