"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CreditCard,
  Calendar,
  Clock,
  User,
  Phone,
  Scissors,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getAllServices } from "@/data/services";
import { barbersData } from "@/data/barbers";
import { useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const services = getAllServices();

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Get booking data from URL parameters
  const bookingData = {
    name: searchParams.get("name"),
    email: searchParams.get("email"),
    service: searchParams.get("service"),
    barber: searchParams.get("barber"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    notes: searchParams.get("notes"),
  };

  // Get service and barber details
  const selectedService = services.find(
    (s) => s.id === parseInt(bookingData.service),
  );
  const selectedBarber = barbersData.find(
    (b) => b.id === parseInt(bookingData.barber),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double clicks

    setIsSubmitting(true);
    try {
      // Send data to API
      await axios.post("/api/create-customer", bookingData);

      // If successful, redirect
      const params = new URLSearchParams({ ...bookingData, paymentMethod });
      window.location.href = `/confirm?${params.toString()}`;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert("Server error. Please check if your Database is connected.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <ShoppingCart size={64} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-xl text-blue-100">
            Review your booking and complete payment
          </p>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Booking Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customer
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Scissors className="text-red-500 mr-3" size={18} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Service
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedService?.name}
                  </p>
                </div>
                <p className="font-bold text-red-500">
                  Rs.{selectedService?.price}
                </p>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Barber
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedBarber?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date & Time
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(bookingData.date).toLocaleDateString()} at{" "}
                    {bookingData.time}
                  </p>
                </div>
              </div>

              {bookingData.notes && (
                <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FileText className="text-red-500 mr-3 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Notes
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bookingData.notes}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">
                    Total Amount:
                  </span>
                  <span className="text-red-500">
                    Rs.{selectedService?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Payment Details
            </h2>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="mr-2">💰</span>
                    <span className="text-gray-900 dark:text-white">
                      Pay at Shop
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Out (Rs.{selectedService?.price})
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
