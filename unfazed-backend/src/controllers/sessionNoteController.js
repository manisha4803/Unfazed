const SessionNote = require("../models/SessionNote");
const createSessionNote = async (req, res) => {
  try {
    const note = await SessionNote.create({
      therapist: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Notes
const getSessionNotes = async (req, res) => {
  try {
    const notes = await SessionNote.find({
      therapist: req.user.id,
    }).populate("client", "name email");

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSessionNote,
  getSessionNotes,
};