const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  verifyPayment,
  getPayments,
} = require("../controllers/paymentController");
router.post("/create-order", authMiddleware, createOrder);

router.post("/verify", authMiddleware, verifyPayment);
router.get("/", authMiddleware, getPayments);
module.exports = router;