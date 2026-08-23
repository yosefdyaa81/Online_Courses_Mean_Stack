const express = require("express");
const progressRouter = express.Router();

const {
  getMyProgress,
  getUserProgress,
  markCourseComplete,
  unmarkCourseComplete,
  markChallengeComplete,
  unmarkChallengeComplete,
} = require("./progress.controller");

const { protect, restrictTo } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {
  courseIdParamSchema,
  challengeIdParamSchema,
  userIdParamSchema,
} = require("./progress.validator");

progressRouter.use(protect);

progressRouter.get("/me", getMyProgress); //tested

progressRouter.get(
  "/user/:userId",
  restrictTo("admin"),
  validate(userIdParamSchema, "params"),
  getUserProgress
); //tested

progressRouter.patch(
  "/complete-course/:courseId",
  validate(courseIdParamSchema, "params"),
  markCourseComplete
);//tested

progressRouter.patch(
  "/uncomplete-course/:courseId",
  validate(courseIdParamSchema, "params"),
  unmarkCourseComplete
);//tested

progressRouter.patch(
  "/complete-challenge/:challengeId",
  validate(challengeIdParamSchema, "params"),
  markChallengeComplete
);

progressRouter.patch(
  "/uncomplete-challenge/:challengeId",
  validate(challengeIdParamSchema, "params"),
  unmarkChallengeComplete
);

module.exports = progressRouter;