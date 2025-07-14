import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section
      className="flex flex-col sm:flex-row border border-gray-400"
      aria-label="Featured products"
    >
      {/* Hero Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
            <span className="font-medium text-sm md:text-base">
              FEATURED COLLECTION
            </span>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            New Season Styles
          </h1>
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => (window.location.href = "/collection")}
          >
            <span className="font-semibold text-sm md:text-base group-hover:underline">
              SHOP COLLECTION
            </span>
            <span className="w-8 md:w-11 h-[1px] bg-[#414141]"></span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <img
        className="w-full sm:w-1/2 object-cover"
        src={assets.hero_img}
        alt="New season fashion collection"
        loading="lazy"
      />
    </section>
  );
};

export default Hero;
