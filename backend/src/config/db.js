const mongoose = require("mongoose");
const { mongoUri } = require("./env");

const dns=require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;