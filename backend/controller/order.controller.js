import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";

class OrderController {
  
  static async createTransaction(req, res) {
    const { amount, userId } = req.body;

    try {
      if (!amount || !userId) {
        return res.status(400).json({
          success: false,
          message: "Amount and user id required",
        });
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_SECRET,
      });

      const options = {
        amount: amount * 100, // convert to paise
        currency: "INR",
        receipt: `receipt#${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

    
      const transaction = new Transaction({
        userId,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        status: "created",
      });
      await transaction.save();

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        key: process.env.RAZOR_PAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create transaction",
        error: error.message,
      });
    }
  }

  
  static async createOrder(req, res) {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      cartItems,
      deliveryDate,
      address,
    } = req.body;

    try {
      const key_secret = process.env.RAZOR_PAY_SECRET;

      
      const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }

      
      const transaction = await Transaction.create({
        userId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Success",
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0
        ),
      });

      // ✅ Save order in DB
      const order = await Order.create({
        userId,
        address,
        deliveryDate,
        items: cartItems?.map((item) => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: "Order Placed",
      });

      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
        transaction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  }
}

export default OrderController;
