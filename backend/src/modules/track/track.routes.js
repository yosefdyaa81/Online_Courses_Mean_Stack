const express = require("express");
const router = express.Router();
const {
    createTrack,
    getTracks,
    getTrackById,
    updateTrack,
    deleteTrack
    } = require("./track.controller");

router.post("/", createTrack);
router.get("/", getTracks);
router.get("/:id", getTrackById);
router.patch("/:id", updateTrack);
router.delete("/:id", deleteTrack);

module.exports = router;
