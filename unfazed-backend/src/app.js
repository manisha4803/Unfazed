const express = require("express");
const cors = require("cors");
const availabilityRoutes = require("./routes/availabilityRoutes");
const authRoutes = require("./routes/authRoutes");
const therapistRoutes = require("./routes/therapistRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const path = require("path");
const clientRoutes = require("./routes/clientRoutes");
const sessionNoteRoutes = require("./routes/sessionNoteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const publicRoutes = require("./routes/publicRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/session-notes", sessionNoteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications",notificationRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Unfazed Backend 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/therapist", therapistRoutes);

// 404 Handler for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler for Mongoose & Express Errors
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  // Multer / File Upload Validation Errors
  if (err.name === "MulterError" || err.message?.includes("allowed")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Mongoose Invalid ObjectId Error
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format for ${err.path}`,
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "Field";
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;