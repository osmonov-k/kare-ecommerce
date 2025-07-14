import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const orderItems = Object.entries(cartItems).flatMap(
        ([productId, sizes]) =>
          Object.entries(sizes)
            .filter(([_, quantity]) => quantity > 0)
            .map(([size, quantity]) => {
              const product = products.find((p) => p._id === productId);
              return product
                ? { ...structuredClone(product), size, quantity }
                : null;
            })
            .filter(Boolean)
      );

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const endpoint =
        paymentMethod === "cod" ? "/api/order/place" : "/api/order/stripe";

      const response = await axios.post(`${backendUrl}${endpoint}`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        if (paymentMethod === "cod") {
          setCartItems({});
          navigate("/orders");
          toast.success("Order placed successfully!");
        } else {
          window.location.replace(response.data.session_url);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Order placement failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      aria-label="Checkout form"
    >
      {/** Delivery Information Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={handleInputChange}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            autoComplete="given-name"
          />
          <input
            required
            onChange={handleInputChange}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>

        <input
          required
          onChange={handleInputChange}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          autoComplete="email"
        />
        <input
          required
          onChange={handleInputChange}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street address"
          autoComplete="street-address"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={handleInputChange}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            autoComplete="address-level2"
          />
          <input
            required
            onChange={handleInputChange}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State/Province"
            autoComplete="address-level1"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={handleInputChange}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            inputMode="numeric"
            placeholder="Postal/Zip code"
            autoComplete="postal-code"
          />
          <input
            required
            onChange={handleInputChange}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            autoComplete="country"
          />
        </div>
        <input
          required
          onChange={handleInputChange}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
        />
      </div>

      {/** Order Summary Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/** Payment Method Selection */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50"
              aria-label="Pay with Stripe"
            >
              <span
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-400" : ""
                }`}
                aria-hidden="true"
              ></span>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="Stripe payment"
              />
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50"
              aria-label="Cash on delivery"
            >
              <span
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
                aria-hidden="true"
              ></span>
              <p className="text-gray-500">Cash on Delivery</p>
            </button>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 cursor-pointer hover:bg-gray-800 transition-colors"
            aria-label="Place order"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
