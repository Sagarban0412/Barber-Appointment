"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    async function fetchServices() {
      const allService = await axios.get("/api/service");
      setServices(allService.data);
      console.log(allService.data);
    }
    fetchServices();
  }, []);

  return (
    <>
      <Header />

      {/* Page Wrapper */}
      <div className=" px-4 md:px-12 py-6">
        {/* Hero Section */}
        <div className="relative h-72 rounded-2xl overflow-hidden">
          <img
            src="/barbershop.jpg"
            alt="Barbershop"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Our Services
            </h1>

            <p className="text-gray-200 max-w-2xl mt-4 text-sm md:text-base">
              Look Sharp, Feel Sharp. Explore our range of premium grooming
              services designed for the modern gentleman. From classic cuts to
              hot towel shaves.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <Link
                href={"/book"}
                className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-lg font-medium"
              >
                Book Appointment
              </Link>

              <button className="bg-white/20 hover:bg-white/30 transition text-white px-6 py-2 rounded-lg font-medium backdrop-blur">
                View Packages
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-bold text-2xl mb-2">HairCut</h1>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible pb-4">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                id={service._id}
                imgSrc={service.imgSrc || "/barbershop.jpg"}
                name={service.name}
                price={service.price}
                serviceDesc={service.description}
                time={service.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

/* Service Card Component */
const ServiceCard = ({ imgSrc, name, price, serviceDesc, time, id }) => {
  return (
    <div
      className="
      min-w-[85%] sm:min-w-[60%] md:min-w-0
      bg-white rounded-2xl shadow-md
      snap-center
      overflow-hidden
    "
    >
      {/* Image */}
      <div className="h-44 overflow-hidden">
        <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-base font-semibold text-black">{name}</h1>
          <span className="text-xs text-gray-500">{time}</span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{serviceDesc}</p>

        <div className="flex justify-between items-center mt-4">
          <h2 className="text-lg font-bold text-red-600">Rs. {price}</h2>

          <Link
            href={`/book?service=${id}`}
            className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
