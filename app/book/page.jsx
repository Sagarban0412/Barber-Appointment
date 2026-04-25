"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, Phone, Scissors, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllServices } from "@/data/services";
import { barbersData, getAvailableTimeSlots } from "@/data/barbers";
import OtpInput from "@/components/OtpInput";
import axios from "axios";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: serviceId || "",
    barber: "",
    date: "",
    time: "",
    notes: "",
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const services = getAllServices();

  useEffect(() => {
    if (serviceId) {
      setFormData((prev) => ({ ...prev, service: serviceId }));
    }
  }, [serviceId]);

  useEffect(() => {
    if (formData.barber && formData.date) {
      const slots = getAvailableTimeSlots(formData.barber, formData.date);
      setAvailableTimeSlots(slots);
      setFormData((prev) => ({ ...prev, time: "" })); // Reset time when barber/date changes
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.barber, formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/send-mail',formData);
    setCorrectOtp(String(res.data.otp))
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isActive, setIsActive] = useState(false);
  const [correctOtp, setCorrectOtp] = useState("");

  return (
    <div className="relative">
      {isActive && (
        <div className="fixed inset-0 top-10 bg-black/50 flex items-center justify-center">
          <OtpInput onChange={setIsActive} correctOtp={correctOtp} formData={formData} />
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
                      <option key={service.id} value={service.id}>
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
                    {barbersData.map((barber) => (
                      <option key={barber.id} value={barber.id}>
                        {barber.name} - {barber.experience} (★{barber.rating})
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
                    min={new Date().toISOString().split("T")[0]}
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
                    disabled={!formData.barber || !formData.date}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!formData.barber || !formData.date
                        ? "Select barber and date first"
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
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Book Appointment
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BookingPage;
