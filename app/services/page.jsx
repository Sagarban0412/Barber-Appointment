"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scissors, Sparkles, Gift } from "lucide-react";

const Page = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const allService = await axios.get("/api/service");
        setServices(allService.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Robust Categorizer logic
  const categorized = {
    haircuts: [],
    beardsAndShaves: [],
    packages: []
  };

  services.forEach((service) => {
    const catName = service.category?.name?.toLowerCase() || "";
    const serviceName = service.name?.toLowerCase() || "";

    if (catName.includes("beard") || catName.includes("shave") || serviceName.includes("beard") || serviceName.includes("shave")) {
      categorized.beardsAndShaves.push(service);
    } else if (catName.includes("package") || catName.includes("combo") || serviceName.includes("package") || serviceName.includes("combo")) {
      categorized.packages.push(service);
    } else {
      categorized.haircuts.push(service);
    }
  });

  const getDefaultImage = (service) => {
    if (service.imgSrc) return service.imgSrc;
    const serviceName = service.name?.toLowerCase() || "";
    if (serviceName.includes("beard") || serviceName.includes("sculpt")) return "/beard_grooming.png";
    if (serviceName.includes("shave")) return "/shaves.jpg";
    if (serviceName.includes("package") || serviceName.includes("combo") || serviceName.includes("grooming")) return "/barbershop.jpg";
    return "/haircutting.jpg";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden">
        <img
          src="/barbershop.jpg"
          alt="Barbershop Header"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-slate-950/80 to-slate-950 dark:from-gray-900"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-red-500/20">
            Tailored Styling Menus
          </span>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-3">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Grooming Services</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Look Sharp, Feel Sharp. Explore our range of premium grooming services designed for the modern gentleman. From classic cuts to steam shaves and elite combos.
          </p>
        </div>
      </div>

      {/* Page Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative z-20">
        
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading styling menus...</div>
        ) : (
          <>
            {/* Section 1: Haircuts */}
            {categorized.haircuts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <Scissors className="text-red-500 w-6 h-6" />
                  <h2 className="font-extrabold text-2xl tracking-tight">Signature Haircuts</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorized.haircuts.map((service) => (
                    <ServiceCard
                      key={service._id}
                      id={service._id}
                      imgSrc={getDefaultImage(service)}
                      name={service.name}
                      price={service.price}
                      serviceDesc={service.description}
                      time={`${service.duration} mins`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Beard & Shaves */}
            {categorized.beardsAndShaves.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <Sparkles className="text-red-500 w-6 h-6" />
                  <h2 className="font-extrabold text-2xl tracking-tight">Beard Trim & Shaves</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorized.beardsAndShaves.map((service) => (
                    <ServiceCard
                      key={service._id}
                      id={service._id}
                      imgSrc={getDefaultImage(service)}
                      name={service.name}
                      price={service.price}
                      serviceDesc={service.description}
                      time={`${service.duration} mins`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Packages */}
            {categorized.packages.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <Gift className="text-red-500 w-6 h-6" />
                  <h2 className="font-extrabold text-2xl tracking-tight">Grooming Packages</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorized.packages.map((service) => (
                    <ServiceCard
                      key={service._id}
                      id={service._id}
                      imgSrc={getDefaultImage(service)}
                      name={service.name}
                      price={service.price}
                      serviceDesc={service.description}
                      time={`${service.duration} mins`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

/* Service Card Component */
const ServiceCard = ({ imgSrc, name, price, serviceDesc, time, id }) => {
  return (
    <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="h-44 w-full overflow-hidden relative">
          <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 bg-black/60 text-white rounded-lg backdrop-blur-sm">
            {time}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed font-light">
            {serviceDesc}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 mt-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-800/50 pt-4">
        <span className="text-xl font-extrabold text-red-500">₹{price}</span>
        <Link
          href={`/book?service=${id}`}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/10 transition-colors cursor-pointer"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Page;
