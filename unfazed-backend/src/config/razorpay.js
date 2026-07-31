const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;