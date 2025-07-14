import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const companyLinks = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
    { label: "Delivery", path: "/delivery" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  const contactInfo = [
    { type: "phone", value: "+1-233-431-42134" },
    { type: "email", value: "contact@gmail.com" },
  ];

  return (
    <footer className="mt-40">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 m-10 text-sm">
        {/* Brand Info */}
        <div className="brand-info">
          <img
            src={assets.logo}
            className="mb-5 w-32"
            alt="Company logo"
            aria-label="Company logo"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Your trusted destination for quality products and exceptional
            service since 2025.
          </p>
        </div>

        {/* Company Links */}
        <div className="company-links">
          <h2 className="text-xl font-medium mb-5">COMPANY</h2>
          <ul className="flex flex-col gap-1 text-gray-600">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="hover:text-black cursor-pointer"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2 className="text-xl font-medium mb-5">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-1 text-gray-600">
            {contactInfo.map((info, index) => (
              <li key={index}>
                <a
                  href={
                    info.type === "email"
                      ? `mailto:${info.value}`
                      : `tel:${info.value.replace(/\D/g, "")}`
                  }
                  className="hover:text-black cursor-pointer"
                  aria-label={
                    info.type === "email"
                      ? "Contact email"
                      : "Contact phone number"
                  }
                >
                  {info.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright-section">
        <hr aria-hidden="true" />
        <p className="py-5 text-sm text-center">
          Copyright 2025 © E-Commerce Demo - A Portfolio Project by Kanat
        </p>
      </div>
    </footer>
  );
};

export default Footer;
