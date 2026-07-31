const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const { client, appointment, amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      therapist: req.user.id,
      client,
      appointment,
      amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      order,
      payment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "Paid",
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      therapist: req.user.id,
    })
      .populate("client", "name email")
      .populate("appointment");

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  verifyPayment,
  getPayments,
};