import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="relative h-[70vh] bg-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-slate-900/50"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex items-center h-full">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
                Premium Barbershop Experience
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Shape Cuts.
              <br />
              <span className="text-red-400">Classic Vibes.</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-lg">
              Experience the art of traditional barbering with modern style.
              Where every cut tells a story and every shave is a masterpiece.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={"/book"}
                className="px-8 py-3 bg-red-500 text-center text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Book Appointment
              </Link>
              <Link href={'/services'} className="px-8 py-3 border-2 border-white/30 text-center text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
