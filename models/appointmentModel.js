import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String, // mongoose.Schema.Types.ObjectId,
      // ref: 'Service',
      required: true,
    },
    barberId: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "booked",
      enum: ["pending", "booked", "cancelled"],
    },
  },
  { timestamps: true },
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
