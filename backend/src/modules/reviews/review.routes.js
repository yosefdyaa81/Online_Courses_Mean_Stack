const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("./review.controller");
const { restrictTo, protect } = require("../../middlewares/auth.middleware");

router.post("/", protect, restrictTo("admin"), createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.patch("/:id", protect, restrictTo("admin"), updateReview);
router.delete("/:id", protect, restrictTo("admin"), deleteReview);

module.exports = router;
