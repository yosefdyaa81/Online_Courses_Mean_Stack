const Progress = require("./progress.model");
const Course = require("../course/course.model"); 
const ApiError = require("../../utils/ApiError");
const getOrCreateProgress = async (userId) => {
  let progress = await Progress.findOne({ userId }).populate("completedCourses");
  if (!progress) {
    progress = await Progress.create({ userId, completedCourses: [], completedChallenges: [] });
  }
  return progress;
};

const completeCourse = async (userId, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError("Course not found", 404);

  return await Progress.findOneAndUpdate(
    { userId },
    { $addToSet: { completedCourses: courseId } },
    { new: true, upsert: true }
  ).populate("completedCourses");
};

const uncompleteCourse = async (userId, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError("Course not found", 404);

  return await Progress.findOneAndUpdate(
    { userId },
    { $pull: { completedCourses: courseId } },
    { new: true }
  ).populate("completedCourses");
};

const completeChallenge = async (userId, challengeId) => {
  return await Progress.findOneAndUpdate(
    { userId },
    { $addToSet: { completedChallenges: challengeId } },
    { new: true, upsert: true }
  );
};

const uncompleteChallenge = async (userId, challengeId) => {
  return await Progress.findOneAndUpdate(
    { userId },
    { $pull: { completedChallenges: challengeId } },
    { new: true }
  );
};

module.exports = {
  getOrCreateProgress,
  completeCourse,
  uncompleteCourse,
  completeChallenge,
  uncompleteChallenge,
};