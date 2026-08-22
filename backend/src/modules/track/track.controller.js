const Track = require("./track.model");

exports.createTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json(track);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find().populate("courses");
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate("courses");
    if (!track) return res.status(404).json({ message: "Track not found" });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!track) return res.status(404).json({ message: "Track not found" });
    res.json(track);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) return res.status(404).json({ message: "Track not found" });
    res.json({ message: "Track deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
