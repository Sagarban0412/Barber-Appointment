
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularServices from "@/components/PopularServicesCard";
import { Droplet, Scissors, Sofa } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <>
      <div>
        <Header />
        <HeroSection />
        {/* Philosophy div */}
        <div className="text-center px-4 md:px-6 lg:px-10 xl:px-20 py-10 flex flex-col items-center gap-2">
          <h1 className="font-semibold text-lg md:text-xl xl:text-3xl ">
            Our Philosophy
          </h1>

          <p className="text-gray-400 max-w-[900px] text-justify">
            We belive a haircut more than just maintenance.it's a ritual. Our
            barber are Master craftmen dedicated to your style,blending
            traditional techniques with modern
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-6">
            <div className="h-[200px] shadow-2xl rounded-xl flex items-center justify-center hover:shadow-lg transition flex-col gap-3">
              <Scissors className="text-red-400 w-8 h-8" />
              <div>
                <h1 className="font-semibold text-lg">Master Barbers</h1>
                <p className="text-sm text-zinc-400">
                  Decade of combined experience in every chair ensuring prises
                  cuts
                </p>
              </div>
            </div>

            <div className="h-[200px] shadow-2xl rounded-xl flex items-center justify-center hover:shadow-lg transition flex-col gap-3">
              <Sofa className="text-red-400 w-8 h-8" />
              <div>
                <h1 className="font-semibold text-lg">Relaxing Atmosphere</h1>
                <p className="text-sm text-zinc-400">
                  A space designed for you to unwind disconnect and recharge
                </p>
              </div>
            </div>

            <div className="h-[200px] shadow-2xl rounded-xl flex items-center justify-center hover:shadow-lg transition flex-col gap-3">
              <Droplet className="text-red-400 w-8 h-8" />
              <div>
                <h1 className="font-semibold text-lg">Premium Products</h1>
                <p className="text-sm text-zinc-400">
                  We only use top-tire grooming product for the hair and skin
                  health
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Popular Services */}
        <div>
          <h1 className="text-center font-semibold text-lg md:text-xl xl:text-3xl ">
            Popular Services
          </h1>
          <div>
            <PopularServices />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Page;
