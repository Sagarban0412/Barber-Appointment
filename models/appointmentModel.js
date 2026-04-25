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
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
