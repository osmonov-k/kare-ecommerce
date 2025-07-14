import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      alt: "Easy exchange",
      title: "Easy Exchange",
      description: "Hassle-free product exchanges within 14 days",
    },
    {
      icon: assets.quality_icon,
      alt: "Quality guarantee",
      title: "7-Day Returns",
      description: "Free returns with no questions asked",
    },
    {
      icon: assets.support_img,
      alt: "Customer support",
      title: "24/7 Support",
      description: "Dedicated customer service team always available",
    },
  ];

  return (
    <section className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map((policy, index) => (
        <div key={index} className="policy-item">
          <img
            src={policy.icon}
            className="w-12 mx-auto mb-5"
            alt={policy.alt}
            aria-hidden="true"
          />
          <h3 className="font-semibold">{policy.title}</h3>
          <p className="text-gray-400">{policy.description}</p>
        </div>
      ))}
    </section>
  );
};

export default OurPolicy;
