const progressService = require("./progress.service.js");

const getMyProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getUserProgress(req.user._id);

    res.status(200).json({
      status: "success",
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

const markCourseComplete = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const progress = await progressService.markCourseAsComplete(req.user._id, courseId);

    res.status(200).json({
      status: "success",
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

const markChallengeComplete = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const progress = await progressService.markChallengeAsComplete(req.user._id, challengeId);

    res.status(200).json({
      status: "success",
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProgress,
  markCourseComplete,
  markChallengeComplete,
};