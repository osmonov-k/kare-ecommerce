import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Our store location"
          loading="lazy"
        />

        <div className="contact-info flex flex-col justify-center items-start gap-6">
          <h2 className="font-semibold text-xl text-gray-600">
            Our Store Information
          </h2>
          <address className="text-gray-500 not-italic">
            103 Greenwich St <br /> San Francisco, California
          </address>
          <div className="text-gray-500">
            <p>
              Tel:{" "}
              <a
                href="tel:+16503337837"
                className="hover:underline cursor-pointer"
              >
                (650) 333-7837
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:admin@gmail.com"
                className="hover:underline cursor-pointer"
              >
                admin@gmail.com
              </a>
            </p>
          </div>
          <h3 className="font-semibold text-gray-600">Join Our Team</h3>
          <p className="text-gray-500">
            Discover exciting career opportunities and become part of our team.
          </p>
          <button
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Explore job openings"
          >
            Explore Job Opportunities
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
