"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Scissors, Star, Heart, Award, ShieldCheck, ArrowRight } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Rajesh Kumar",
    role: "Master Barber & Founder",
    experience: "15+ Years Experience",
    specialty: "Precision Fades & Classic Tapers",
    bio: "Rajesh founded BarberShop with a singular vision: to revive the classic gentlemen's grooming experience with a sharp, modern edge.",
    image: "/haircutting.jpg"
  },
  {
    name: "Vikram Singh",
    role: "Shaving & Beard Architect",
    experience: "8 Years Experience",
    specialty: "Straight Razor Hot Towel Shaves",
    bio: "Vikram is a true artisan when it comes to straight razors. His hot towel shaves are legendary, providing a masterclass in relaxation.",
    image: "/beard_grooming.png"
  },
  {
    name: "Amit Sharma",
    role: "Senior Stylist",
    experience: "6 Years Experience",
    specialty: "Modern Texturizing & Styling",
    bio: "Amit specializes in trendsetting styles. Whether you want a textured crop or custom coloring, Amit has the creative touch.",
    image: "/beardCut.jpg"
  }
];

const CORE_VALUES = [
  {
    icon: <Award className="w-8 h-8 text-red-500" />,
    title: "Master Craftsmanship",
    desc: "Every cut is a hand-sculpted piece of art. We practice absolute precision down to the last millimeter."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    title: "Hygiene & Comfort",
    desc: "We strictly sterilize all instruments using industry-leading guidelines. Your health and comfort are absolute priorities."
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Relaxing Experience",
    desc: "A sanctuary designed for you to unwind, sip on a beverage, and recharge while we take care of your grooming."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Banner Section */}
      <div className="relative h-[45vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-slate-950/70 to-slate-950/90 dark:from-gray-900" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 text-sm font-semibold mb-4 border border-red-500/20">
            Our Legacy & Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">BarberShop</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Blending traditional barbering heritage with cutting-edge styles to shape the ultimate grooming ritual.
          </p>
        </div>
      </div>

      {/* Story & Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Scissors size={24} />
              <span className="font-bold tracking-widest text-xs uppercase">Since 2018</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              A Haircut is a Ritual, Not Maintenance.
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              We started BarberShop with a commitment to create more than just a place to get a quick cut. We envisioned a social hub, a sanctuary where gentlemen could pause their hectic days, sit back in premium chairs, and enjoy a curated grooming experience custom-tailored to their features.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Our barbers are vetted artisans with decades of combined experience, mastering traditional techniques like the hot towel straight razor shave while perfecting modern skin fades and styling.
            </p>

            <div className="pt-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <span>Book a Seat in Our Chair</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-750">
              <img 
                src="/barbershop.jpg" 
                alt="Barbershop ambiance" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
            {/* Overlay statistics badge */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-red-400/20">
              <div className="text-3xl font-black">5.0</div>
              <div className="border-l border-white/20 pl-4">
                <div className="flex text-yellow-300 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-red-100">1000+ Reviews</div>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="mt-24 text-center">
          <span className="text-red-500 font-bold tracking-widest text-xs uppercase">What Drives Us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2 mb-16">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow text-center flex flex-col items-center gap-4"
              >
                <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/20 mb-2">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold">{val.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mt-28">
          <div className="text-center">
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Master Craftsmen</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2 mb-16">
              Meet Our Barber Squad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div 
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />
                  
                  {/* Floating specialty badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-bold shadow-md">
                    {member.experience}
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-extrabold group-hover:text-red-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-red-500 font-semibold tracking-wide">
                      {member.role}
                    </p>
                  </div>
                  
                  <div className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-150 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 font-medium">
                    Specialty: <strong>{member.specialty}</strong>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
