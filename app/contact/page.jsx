"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mocking an elegant response API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Banner Section */}
      <div className="relative h-[45vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-50"
        />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white dark:text-white mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Our Shop</span>
          </h1>
          <p className="text-base md:text-xl text-white dark:text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Have a question, feedback, or want a custom service? Reach out to us and we'll get back to you shortly.
          </p>
        </div>
      </div>

      {/* Contact Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Interactive Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6 text-red-500">
              <MessageSquare size={24} />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Send Us a Message
              </h2>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/25 text-center space-y-4 animate-scaleUp">
                <CheckCircle2 size={48} className="mx-auto text-green-500" />
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Thank you for reaching out. A booking associate or styling consultant will review your message and reach back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is your message regarding?"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Type your message details here..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 ${
                      loading
                        ? "bg-gray-400 dark:bg-gray-700 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-600/30 scale-100 hover:scale-[1.01]"
                    }`}
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Column 3: Contact Info & Map Mockup */}
          <div className="space-y-8">
            
            {/* Contact Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
              <h3 className="text-xl font-bold tracking-tight">Shop Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-red-500 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Address</h4>
                    <p className="text-sm font-medium mt-0.5 leading-relaxed">
                      bhadrapur-9, chandragadi, <br />
                      Near Subisu office, TVS showroom road
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-red-500 mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Phone</h4>
                    <p className="text-sm font-medium mt-0.5">+977 980-0000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-red-500 mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Email</h4>
                    <p className="text-sm font-medium mt-0.5">contact@barbershop.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-red-500 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Hours</h4>
                    <div className="text-sm font-medium mt-0.5 space-y-0.5">
                      <p>Wed-Mon: 8:00 AM - 8:00 PM</p>
                      <p className="text-red-500 font-semibold">Tuesday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map Representation */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 relative group">
              <div className="p-4 bg-gray-50 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm font-bold tracking-wide">Our Location Map</span>
                <span className="text-xs text-red-500 font-semibold animate-pulse">Live</span>
              </div>
              <div className="h-56 relative bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="/location.png" 
                  alt="Shop map coordinate visual" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20" />
                <div className="absolute p-3 rounded-full bg-red-500 text-white animate-bounce shadow-lg border-2 border-white">
                  <MapPin size={20} />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
