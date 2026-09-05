import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    paymentIntent: { type: String, default: null },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "inr" },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    customerEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    barberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    notes: { type: String, default: "" },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
  },
  { timestamps: true },
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
