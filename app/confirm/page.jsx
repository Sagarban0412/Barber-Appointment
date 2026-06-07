"use client"
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import { CheckCircle2, Calendar, Clock, User, Scissors, Mail, FileText, CreditCard, ChevronRight } from "lucide-react";

const ConfirmContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const serviceId = searchParams.get("service");
  const barberId = searchParams.get("barber");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const notes = searchParams.get("notes");
  const paymentMethod = searchParams.get("paymentMethod") || "cash";

  const [service, setService] = useState(null);
  const [barber, setBarber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [serviceRes, barberRes] = await Promise.all([
          axios.get(`/api/service/${serviceId}`),
          axios.get(`/api/barber/${barberId}`),
        ]);
        setService(serviceRes.data.service);
        setBarber(barberRes.data.barber);
      } catch (err) {
        console.error("Failed to fetch confirmation details:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (serviceId && barberId) fetchDetails();
    else setLoading(false);
  }, [serviceId, barberId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col justify-between">
      <div>
        <Header />
        
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-scaleUp">
            
            {/* Header Success Section */}
            <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white text-center py-12 px-6 relative">
              {/* Background abstract overlay pattern */}
              <div className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              
              <div className="relative z-10 space-y-3">
                <CheckCircle2 size={64} className="mx-auto text-white animate-bounce" />
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Appointment Confirmed!
                </h1>
                <p className="text-green-100 text-sm md:text-base max-w-md mx-auto font-light">
                  Your seat in the chair has been reserved. A confirmation receipt has been sent to your email details.
                </p>
              </div>
            </div>

            {/* Receipt Content Body */}
            <div className="p-6 md:p-10 space-y-8">
              
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-bold tracking-tight">Booking Summary Details</h2>
                <span className="text-xs font-semibold px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">
                  Paid at Shop
                </span>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-400">Fetching receipt details...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Customer details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <User size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</h4>
                        <p className="font-bold mt-0.5">{name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Mail size={12} />
                          <span>{email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <Scissors size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</h4>
                        <p className="font-bold mt-0.5">{service?.name || "Premium Cut"}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Duration: {service?.duration || 30} mins</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <User size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned Barber</h4>
                        <p className="font-bold mt-0.5">{barber?.name || "Master Barber"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Time/Date Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</h4>
                        <p className="font-bold mt-0.5">
                          {date ? new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select Date"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</h4>
                        <p className="font-bold mt-0.5">{time || "8:00 AM"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-400">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment Status</h4>
                        <p className="font-bold mt-0.5 uppercase text-sm">
                          {paymentMethod === "cash" ? "Pay at Shop" : "Online Payment"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Notes block if present */}
              {notes && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-150 dark:border-gray-600 flex gap-3 items-start">
                  <FileText size={18} className="text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Special Requests</h4>
                    <p className="text-sm mt-0.5 font-light leading-relaxed">{notes}</p>
                  </div>
                </div>
              )}

              {/* Total amount section */}
              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-6 flex justify-between items-center text-xl font-extrabold">
                <span>Amount Due:</span>
                <span className="text-red-500">₹{service?.price || 150}</span>
              </div>

              {/* Footer CTAs */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="flex-1 text-center py-3.5 px-6 font-bold bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg shadow-red-500/10 transition-all duration-300 scale-100 hover:scale-[1.02]"
                >
                  Return to Home
                </Link>
                <Link
                  href="/services"
                  className="py-3.5 px-6 text-center font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-1"
                >
                  <span>Explore Services</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-400">Loading booking receipt...</div>}>
    <ConfirmContent />
  </Suspense>
);

export default Page;
