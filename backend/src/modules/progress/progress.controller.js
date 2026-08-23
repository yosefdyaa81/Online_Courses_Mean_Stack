const progressService = require("./progress.service");

const getMyProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getOrCreateProgress(req.user._id);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

const getUserProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getOrCreateProgress(req.params.userId);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

const markCourseComplete = async (req, res, next) => {
  try {
    const progress = await progressService.completeCourse(req.user._id, req.params.courseId);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

const unmarkCourseComplete = async (req, res, next) => {
  try {
    const progress = await progressService.uncompleteCourse(req.user._id, req.params.courseId);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

const markChallengeComplete = async (req, res, next) => {
  try {
    const progress = await progressService.completeChallenge(req.user._id, req.params.challengeId);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

const unmarkChallengeComplete = async (req, res, next) => {
  try {
    const progress = await progressService.uncompleteChallenge(req.user._id, req.params.challengeId);
    res.status(200).json({ status: "success", data: { progress } });
  } catch (err) { next(err); }
};

module.exports = {
  getMyProgress,
  getUserProgress,
  markCourseComplete,
  unmarkCourseComplete,
  markChallengeComplete,
  unmarkChallengeComplete,
};