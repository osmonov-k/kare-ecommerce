import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Configuration constants
const CURRENCY = "usd";
const SHIPPING_FEE = 10;

// Payment gateway setup
const paymentGateway = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process cash on delivery orders
const createCashOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderDetails = {
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
      orderDate: Date.now(),
    };

    const order = new orderModel(orderDetails);
    await order.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order successfully placed" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Process Stripe payment orders
const createStripeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderInfo = {
      userId,
      items,
      address,
      amount,
      paymentType: "Stripe",
      isPaid: false,
      orderDate: Date.now(),
    };

    const order = new orderModel(orderInfo);
    await order.save();

    const checkoutItems = items.map((product) => ({
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    checkoutItems.push({
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: SHIPPING_FEE * 100,
      },
      quantity: 1,
    });

    const paymentSession = await paymentGateway.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items: checkoutItems,
      mode: "payment",
    });

    res.json({ success: true, checkoutUrl: paymentSession.url });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Verify payment status
const confirmPayment = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { isPaid: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orderList = await orderModel.find({});
    res.json({ success: true, orders: orderList });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Get user-specific orders
const getUserOrderHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    const userOrders = await orderModel.find({ userId });
    res.json({ success: true, data: userOrders });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Update order status
const modifyOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  createCashOrder as placeOrder,
  createStripeOrder as placeOrderStripe,
  getAllOrders as allOrders,
  getUserOrderHistory as userOrders,
  modifyOrderStatus as updateStatus,
  confirmPayment as verifyStripe,
};
