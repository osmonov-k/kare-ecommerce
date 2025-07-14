import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderHistory(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading orders...</div>;
  }

  if (!orderHistory.length) {
    return <div className="p-4 text-center">No orders found</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Order Management</h3>
      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={order._id}
          >
            <img
              className="w-12 cursor-pointer"
              src={assets.parcel_icon}
              alt="Order package"
            />

            <div>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <p className="py-0.5" key={item._id + "" + index}>
                    {item.name} × {item.quantity} {item.size}
                    {index < order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.zipcode}
                </p>
                <p>{order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Completed" : "Pending"}</p>
              <p>
                Date:{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <p className="font-medium">
              {currency} {order.amount.toFixed(2)}
            </p>

            <select
              onChange={(event) => handleStatusChange(event, order._id)}
              value={order.status}
              className="p-2 font-semibold cursor-pointer border rounded"
              aria-label={`Update status for order ${order._id}`}
            >
              <option value="Order Placed">Order Received</option>
              <option value="Packing">Preparing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
