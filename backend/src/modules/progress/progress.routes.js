const express = require('express');
const progressRouter = express.Router();

const {
  getMyProgress,
  markCourseComplete,
  markChallengeComplete,
} = require('./progress.controller.js');

const { protect } = require('../middlewares/auth.middleware.js');

progressRouter.use(protect);

progressRouter.get('/me', getMyProgress);
progressRouter.patch('/complete-course/:courseId', markCourseComplete);
progressRouter.patch('/complete-challenge/:challengeId', markChallengeComplete);

module.exports = progressRouter;