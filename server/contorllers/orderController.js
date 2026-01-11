import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "Food Processing",
      payment: false
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};


const vreifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (e) {
    res.json({ success: false, message: "Error verifying payment" });
  }
};


const usesrOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId,
      payment: true
    });

    res.json({ success: true, data: orders });
  } catch (e) {
    res.json({ success: false, message: "Error fetching user orders" });
  }
};


const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ payment: true });
    res.json({ success: true, data: orders });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error fetching orders" });
  }
};


const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status
    });
    res.json({ success: true, message: "Status updated" });
  } catch (e) {
    res.json({ success: false, message: "Error updating status" });
  }
};

export {
  placeOrder,
  vreifyOrder,
  usesrOrder,
  listOrders,
  updateStatus
};
