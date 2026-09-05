"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, Phone, Scissors, Mail } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { generateTimeSlots } from "@/data/barbers";
import OtpInput from "@/components/OtpInput";
import axios from "axios";

const BookingForm = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const prefilledName = searchParams.get("name") || "";
  const prefilledEmail = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    name: prefilledName,
    email: prefilledEmail,
    service: serviceId || "",
    barber: "",
    date: "",
    time: "",
    notes: "",
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  // Fetch services on component mount
  useEffect(() => {
    const getAllServices = async () => {
      try {
        const service = await axios.get("/api/service");
        setServices(service.data);
        console.log(service.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    const getBarbers = async () => {
      try {
        const barber = await axios.get('/api/barber')
        setBarbers(barber.data.barbers);
        console.log(barber.data.barbers)
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
      }
    }
    getBarbers();
    getAllServices();
  }, []);

  // Set initial service from URL query param
  useEffect(() => {
    if (serviceId) {
      setFormData((prev) => ({ ...prev, service: serviceId }));
    }
  }, [serviceId]);

  useEffect(() => {
    if (formData.barber && formData.date && formData.service) {
      const selectedBarber = barbers.find((b) => b._id === formData.barber);
      const selectedService = services.find((s) => s._id === formData.service);

      if (selectedBarber?.workingHours && selectedService?.duration) {
        const slots = generateTimeSlots(
          selectedBarber.workingHours.start,
          selectedBarber.workingHours.end,
          selectedService.duration
        );
        setAvailableTimeSlots(slots);
      } else {
        setAvailableTimeSlots([]);
      }
      setFormData((prev) => ({ ...prev, time: "" }));
    } else {
      setAvailableTimeSlots([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.barber, formData.date, formData.service]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/send-mail", formData);
      setCorrectOtp(String(res.data.otp));
      setIsActive(true); // <--- This was missing!
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please check your email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isActive, setIsActive] = useState(false);
  const [correctOtp, setCorrectOtp] = useState("");

  //setting date
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <div className="relative">
      {isActive && (
        <div className="fixed inset-0 top-10 bg-black/50 flex items-center justify-center">
          <OtpInput
            onChange={setIsActive}
            correctOtp={correctOtp}
            formData={formData}
          />
        </div>
      )}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />

        {/* Hero Section */}
        <div className="bg-slate-900 dark:bg-gray-800 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
            <p className="text-xl text-gray-300 dark:text-gray-400">
              Reserve your spot for the ultimate grooming experience
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your Email Address"
                  />
                </div>
              </div>

              {/* Service and Barber Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="">Choose a service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name} - ₹{service.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Scissors size={16} className="inline mr-2" />
                    Select Barber
                  </label>
                  <select
                    name="barber"
                    value={formData.barber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="">Choose a barber</option>
                    {barbers.map((barber) => (
                      <option key={barber._id} value={barber._id}>
                        {barber.name} - {barber.specialty[0] + ", " + barber.specialty[1]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Clock size={16} className="inline mr-2" />
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    disabled={!formData.barber || !formData.date || !formData.service}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!formData.barber || !formData.date || !formData.service
                        ? "Select service, barber and date first"
                        : availableTimeSlots.length === 0
                          ? "No available slots"
                          : "Select time"}
                    </option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${isSubmitting
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                {isSubmitting ? "Sending OTP..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const BookingPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookingForm />
  </Suspense>
);

export default BookingPage;
