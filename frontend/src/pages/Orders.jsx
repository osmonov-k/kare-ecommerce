import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const processedOrders = response.data.orders
          .flatMap((order) =>
            order.items.map((item) => ({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            }))
          )
          .reverse();

        setOrders(processedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="orders-list">
        {orders.slice(0, 3).map((order, index) => (
          <div
            key={`${order._id}-${index}`}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={order.image[0]}
                className="w-16 sm:w-20"
                alt={order.name}
                loading="lazy"
              />
              <div className="order-details">
                <p className="sm:text-base font-medium">{order.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {order.price}
                  </p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Size: {order.size}</p>
                </div>
                <p className="mt-1">
                  Ordered on:{" "}
                  <span className="text-gray-400">
                    {new Date(order.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment method:{" "}
                  <span className="text-gray-400">{order.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="order-status md:h-1/2 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`min-w-2 h-2 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                  aria-hidden="true"
                ></span>
                <p className="text-sm md:text-base capitalize">
                  {order.status.toLowerCase()}
                </p>
              </div>
              <button
                onClick={fetchUserOrders}
                className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-100 transition-colors"
                aria-label={`Track order for ${order.name}`}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
