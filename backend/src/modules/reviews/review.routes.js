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

router.post("/", protect, createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.patch("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;