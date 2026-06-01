import { Scissors } from "lucide-react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between px-4 md:px-6 lg:px-10 xl:px-20 py-12 bg-black/95 text-white/50 border-t border-gray-800">
        <div className="flex flex-col xl:w-64 gap-5 pb-5">
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-red-500" />
            <h1 className="font-extrabold text-xl text-white tracking-wider uppercase">
              BarberShop
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-justify text-gray-400">
            Modern Grooming for the gentleman. Book an appointment today and experience precision styling in an ultra-relaxing ambiance.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-lg text-white mb-2">Quick Links</h1>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallary" className="hover:text-red-500 transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-red-500 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-500 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 py-3 xl:py-0">
          <h1 className="font-bold text-lg text-white mb-2">Opening Hours</h1>
          <div className="text-sm space-y-1.5 text-gray-400">
            <p>Wed-Mon: 8:00 AM - 8:00 PM</p>
            <p>
              Tuesday: <span className="text-red-500 font-bold uppercase">Closed</span>
            </p>
          </div>
        </div>

        <div className="py-3 xl:py-0 flex flex-col gap-4 max-w-sm">
          <h1 className="font-bold text-lg text-white mb-2">Find Us</h1>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-slate-900/50">
            <img
              src="/location.png"
              alt="location map coordinate"
              className="h-32 w-80 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            bhadrapur-9, chandragadi, <br />
            Near Subisu office, infront of TVS showroom
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
