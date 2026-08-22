const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


//routes
const authRoutes=require("./modules/auth/auth.routes");
const userRoutes=require("./modules/users/user.routes");
const progressRoutes=require("./modules/progress/progress.routes");
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Our online Platform API is running",
  });
});


//endpoints

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/progress",progressRoutes);



module.exports = app;