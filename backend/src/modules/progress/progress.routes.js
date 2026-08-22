const express = require("express");
const progressRouter = express.Router();

const {
  getMyProgress,
  markCourseComplete,
  markChallengeComplete,
} = require("./progress.controller.js");

const { protect } = require("../../middlewares/auth.middleware.js");
const { validate } = require("../../middlewares/validate.middleware.js");
const { courseIdParamSchema, challengeIdParamSchema } = require("./progress.validator.js");

progressRouter.use(protect);

progressRouter.get("/me", getMyProgress);
progressRouter.patch("/complete-course/:courseId",
  validate(courseIdParamSchema, "params"),
  markCourseComplete
);
progressRouter.patch(
  "/complete-challenge/:challengeId",
  validate(challengeIdParamSchema, "params"),
  markChallengeComplete
);

module.exports = progressRouter;