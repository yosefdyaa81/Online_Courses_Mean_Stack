const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    playlistUrl: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    level: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
      ],
      default: "beginner",
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.index(
  { course: 1, slug: 1 },
  { unique: true }
);

topicSchema.index({
  course: 1,
  order: 1,
});

module.exports = mongoose.model("Topic", topicSchema);