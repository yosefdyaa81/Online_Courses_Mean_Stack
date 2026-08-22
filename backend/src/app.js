const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Our online Platform API is running",
  });
});

//routes
const authRoutes = require("./modules/auth/auth.routes");

const trackRoutes = require("./modules/track/track.routes");

const reviewRoutes = require("./modules/reviews/review.routes");

// بعد authRoutes

app.use("/api/tracks", trackRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
