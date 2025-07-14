import React from "react";

const NewsletterBox = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="text-center" aria-label="Newsletter subscription">
      <h2 className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </h2>

      <p className="text-gray-400 mt-3">
        Stay updated with our latest collections and exclusive offers
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        aria-label="Email subscription form"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email address"
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Subscribe to newsletter"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;
