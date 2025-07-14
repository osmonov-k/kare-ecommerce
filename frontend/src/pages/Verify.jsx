import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isSuccess = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripePayment = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success: isSuccess, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment verified successfully!");
        navigate("/orders");
      } else {
        toast.error("Payment verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Payment verification failed"
      );
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyStripePayment();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg font-medium">Verifying your payment...</p>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we process your transaction
        </p>
      </div>
    </div>
  );
};

export default VerifyPayment;
