import mongoose from "mongoose";

const BarberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specialty: {
    type: Array,
    required: true,
  },
  workingHours: {
    start: {
      type: String,
      default: "09:00",
    },
    end: {
      type: String,
      default: "17:00",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Barber = mongoose.models.Barber || mongoose.model("Barber", BarberSchema);

export default Barber;
