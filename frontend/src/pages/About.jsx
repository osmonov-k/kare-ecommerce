import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <article>
      <section className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"KARE"} />
      </section>

      <section className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="The Kare team creating exceptional shopping experiences"
          loading="lazy"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Kare emerged from a shared vision to transform online shopping into
            something extraordinary. We set out to build more than just a store
            - a destination where quality meets convenience, and every purchase
            feels personal.
          </p>
          <p>
            What began as a simple idea has grown into a carefully curated
            collection of premium products. Our team hand-selects each item,
            partnering only with brands that share our commitment to excellence
            and customer satisfaction.
          </p>
          <h2 className="text-gray-800 font-bold">Our Promise</h2>
          <p>
            At Kare, we pledge to deliver more than products - we deliver
            confidence in every purchase. From intuitive browsing to seamless
            checkout and reliable delivery, we've refined every step of your
            shopping journey.
          </p>
        </div>
      </section>

      <section className="text-xl py-4">
        <Title text1={"THE"} text2={"KARE DIFFERENCE"} />
      </section>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h3 className="font-bold">Uncompromising Quality</h3>
          <p className="text-gray-600">
            Every product in our collection undergoes rigorous evaluation to
            meet our exacting standards. We test, inspect, and verify so you can
            shop with complete confidence.
          </p>
        </article>

        <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h3 className="font-bold">Effortless Experience</h3>
          <p className="text-gray-600">
            Our intuitive platform puts what you need right at your fingertips.
            Discover, select, and checkout in just a few clicks - shopping
            should be this simple.
          </p>
        </article>

        <article className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h3 className="font-bold">Dedicated Support</h3>
          <p className="text-gray-600">
            Our customer care team brings expertise and enthusiasm to every
            interaction. Have a question? We're here to help, around the clock.
          </p>
        </article>
      </div>
      <NewsletterBox />
    </article>
  );
};

export default About;
