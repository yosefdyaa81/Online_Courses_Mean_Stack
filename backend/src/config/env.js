const dotenv = require("dotenv");

dotenv.config();
// dotenv.config({ path: __dirname + "/../../.env" });

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGO_URI,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  clientUrl: process.env.CLIENT_URL,
};

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
