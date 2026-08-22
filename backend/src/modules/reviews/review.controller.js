const Review = require("./review.model");

// إنشاء Review جديد
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// عرض كل الـ Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    //   .populate("user", "name email")
    //   .populate("course", "title slug");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// عرض Review واحد
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    //   .populate("user", "name email")
    //   .populate("course", "title slug");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تعديل Review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// حذف Review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
