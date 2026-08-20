const express = require("express");

const courseController = require("./course.controller");

const {
  createCourseSchema,
  updateCourseSchema,
} = require("./course.validation");

const validate = require("../../middlewares/validate.middleware");
const { restrictTo, protect } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);


router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createCourseSchema),
  courseController.createCourse
);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(updateCourseSchema),
  courseController.updateCourse
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  courseController.deleteCourse
);

module.exports = router;