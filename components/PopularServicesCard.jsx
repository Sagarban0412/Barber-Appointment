import React from "react";
import { getPopularServices } from "@/data/services";
import Link from "next/link";

const PopularServicesCard = ({
  serviceName,
  servicePrice,
  serviceCategory,
  duration,
  service,
  serviceId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{serviceName}</h3>
          <p className="text-gray-500">{duration}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-500">Rs.{servicePrice}</p>
          <Link href={`/book?service=${serviceId}`} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer inline-block">
            Book {serviceCategory}
          </Link>
        </div>
      </div>
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-700 mb-2">Includes:</h4>
        <ul className="space-y-1">
          {service.map((item, index) => (
            <li key={index} className="text-gray-600 text-sm flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function PopularServices() {
  const popularServices = getPopularServices();
  
  return (
    <div className="px-4 md:px-6 lg:px-10 xl:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {popularServices.map((service) => (
          <PopularServicesCard
            key={service.id}
            serviceId={service.id}
            serviceName={service.name}
            servicePrice={service.price}
            serviceCategory={service.category}
            service={["Consultation", "Wash and style", "Hot Towel Finish"]}
            duration={service.time}
          />
        ))}
      </div>
    </div>
  );
}
