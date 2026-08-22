const express = require("express");
const router = express.Router();
const {
  createTrack,
  getTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
} = require("./track.controller");
const { restrictTo, protect } = require("../../middlewares/auth.middleware");

router.post("/", protect, restrictTo("admin"), createTrack);
router.get("/", getTracks);
router.get("/:id", getTrackById);
router.patch("/:id", protect, restrictTo("admin"), updateTrack);
router.delete("/:id", protect, restrictTo("admin"), deleteTrack);

module.exports = router;
