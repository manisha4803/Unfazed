const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", authMiddleware, createAppointment);

router.get("/", authMiddleware, getAppointments);

router.put("/:id", authMiddleware, updateAppointmentStatus);

router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;