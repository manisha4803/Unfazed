const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

const router = express.Router();

router.post("/", authMiddleware, createAvailability);

router.get("/", authMiddleware, getAvailability);

router.put("/:id", authMiddleware, updateAvailability);

router.delete("/:id", authMiddleware, deleteAvailability);

module.exports = router;