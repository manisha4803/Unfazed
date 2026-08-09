const mongoose = require("mongoose");
const dns = require("dns");

if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
  } catch (e) {
    console.error("DNS setServers failed:", e);
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.error("⚠️ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB connection lost.");
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(`Reason: ${error.message}`);
  }
};

module.exports = connectDB;