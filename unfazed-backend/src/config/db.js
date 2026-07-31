const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
    console.error(
      "👉 Tip: If this is an IP Whitelist error, please add your current IP address in MongoDB Atlas under Security -> Network Access."
    );
  }
};

module.exports = connectDB;