import { Scissors } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between px-4 md:px-6 lg:px-10 xl:px-20 py-10 bg-black/90 text-white/50">
        <div className="flex flex-col xl:w-56 gap-5 pb-5">
          <div className="flex items-center ga">
            <Scissors className="w-8 h-8 text-red-400" />
            <h1 className="font-semibold text-sm md:text-lg lg:text-xl">
              BarberShop
            </h1>
          </div>
          <p className="text-justify">
            Modern Grooming for the gentalman. Book appointment today and
            experience the different looks.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-xl text-center">Quick Links</h1>
          <ul className="text-center">
            <li>Home</li>
            <li>Gallery</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 text-center py-3">
          <h1 className="font-semibold text-xl ">Opening Hours</h1>
          <div>
            <p>Wed-Mon: 8:00 AM - 8:00 PM</p>
            <p>
              Tue: <span className="text-red-600">Closed</span>
            </p>
          </div>
        </div>
        <div className="text-center py-3">
          <h1 className="font-semibold text-xl">Find Us</h1>
          <div className="flex justify-center">
            <img
              src="/location.png"
              alt="location"
              className="h-52 w-[400px]"
            />
          </div>
          <p>
            bhadrapur-9,chandragadi,
            <br />
            Near Subisu office,infront of TVS showroom
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
