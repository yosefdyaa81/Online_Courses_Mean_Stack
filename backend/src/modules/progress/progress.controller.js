const Progress = require('./progress.model.js');

const getMyProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id })
      .populate('completedCourses')
      .populate('completedChallenges');

   
    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    res.status(200).json({
      status: 'success',
      data: { progress },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'error fetching progress',
      error: error.message,
    });
  }
};

const markCourseComplete = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id },
      { $addToSet: { completedCourses: courseId } },
      { new: true, upsert: true }
    ).populate('completedCourses').populate('completedChallenges');

    res.status(200).json({
      status: 'success',
      data: { progress },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error updating course progress',
      error: error.message,
    });
  }
};

const markChallengeComplete = async (req, res) => {
  try {
    const { challengeId } = req.params;

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id },
      { $addToSet: { completedChallenges: challengeId } },
      { new: true, upsert: true }
    ).populate('completedCourses').populate('completedChallenges');

    res.status(200).json({
      status: 'success',
      data: { progress },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error updating challenge progress',
      error: error.message,
    });
  }
};

module.exports = {
  getMyProgress,
  markCourseComplete,
  markChallengeComplete,
};