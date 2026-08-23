const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


//routes
const authRoutes=require("./modules/auth/auth.routes");
const userRoutes=require("./modules/users/user.routes");
const progressRoutes=require("./modules/progress/progress.routes");
const categoryRoutes = require("./modules/category/category.routes");
const courseRoutes = require("./modules/course/course.routes");
const topicRoutes=require("./modules/topic/topic.routes");

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

app.use("/api/categories",categoryRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/topics",topicRoutes);





app.use("/api/categories",categoryRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/topics",topicRoutes);






const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;