const Progress = require("./progress.model.js");
const Course = require("../course/course.model.js");
const ApiError = require("../../utils/ApiError");

const getUserProgress = async (userId) => {
  let progress = await Progress.findOne({ userId }).populate("completedCourses");

  if (!progress) {
    progress = await Progress.create({ userId });
  }

  return progress;
};

const markCourseAsComplete = async (userId, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  const progress = await Progress.findOneAndUpdate(
    { userId },
    { $addToSet: { completedCourses: courseId } },
    { new: true, upsert: true }
  ).populate("completedCourses");

  return progress;
};

const markChallengeAsComplete = async (userId, challengeId) => {
  const progress = await Progress.findOneAndUpdate(
    { userId },
    { $addToSet: { completedChallenges: challengeId } },
    { new: true, upsert: true }
  ).populate("completedCourses");

  return progress;
};

module.exports = {
  getUserProgress,
  markCourseAsComplete,
  markChallengeAsComplete,
};