const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },

    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
      },
    ],

    completedChallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge", 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);