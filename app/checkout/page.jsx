"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  User,
  Scissors,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";

const CheckoutContent = () => {
  const searchParams = useSearchParams();

  const bookingData = {
    name: searchParams.get("name"),
    email: searchParams.get("email"),
    service: searchParams.get("service"),
    barber: searchParams.get("barber"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    notes: searchParams.get("notes"),
  };

  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [serviceRes, barberRes] = await Promise.all([
          axios.get(`/api/service/${bookingData.service}`),
          axios.get(`/api/barber/${bookingData.barber}`),
        ]);
        setSelectedService(serviceRes.data.service);
        setSelectedBarber(barberRes.data.barber);
      } catch (err) {
        console.error("Failed to fetch details:", err.message);
      }
    };
    if (bookingData.service && bookingData.barber) fetchDetails();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const customerRes = await axios.post("/api/create-customer", bookingData);
      console.log("Customer:", customerRes.data);

      const appointmentRes = await axios.post("/api/appointment", bookingData);
      console.log("Appointment:", appointmentRes.data);

      const params = new URLSearchParams({ ...bookingData, paymentMethod });
      window.location.href = `/confirm?${params.toString()}`;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
      console.error("API Error:", err.response?.data || err.message);
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <ShoppingCart size={64} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-xl text-blue-100">Review your booking and complete payment</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                  <p className="font-medium text-gray-900 dark:text-white">{bookingData.name}</p>
                  <p className="text-sm text-gray-500">{bookingData.email}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Scissors className="text-red-500 mr-3" size={18} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedService?.name ?? "Loading..."}
                  </p>
                  <p className="text-sm text-gray-500">{selectedService?.duration} mins</p>
                </div>
                <p className="font-bold text-red-500">Rs.{selectedService?.price}</p>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Barber</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedBarber?.name ?? "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="text-red-500 mr-3" size={18} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                  </p>
                </div>
              </div>

              {bookingData.notes && (
                <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FileText className="text-red-500 mr-3 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
                    <p className="font-medium text-gray-900 dark:text-white">{bookingData.notes}</p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total Amount:</span>
                  <span className="text-red-500">Rs.{selectedService?.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Payment Method
                </label>
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
                  <span className="text-gray-900 dark:text-white">Pay at Shop</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? "Processing..." : `Check Out (Rs.${selectedService?.price ?? ""})`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CheckoutPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CheckoutContent />
  </Suspense>
);

export default CheckoutPage;
