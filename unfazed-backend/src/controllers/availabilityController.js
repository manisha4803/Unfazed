const Availability = require("../models/Availability");

const createAvailability = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;

    if (!day || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "day, startTime, and endTime are required",
      });
    }

    const availability = await Availability.create({
      therapist: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Availability created successfully",
      availability,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({
      therapist: req.user.id,
    });

    res.status(200).json({
      success: true,
      availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOneAndUpdate(
      { _id: req.params.id, therapist: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      availability,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Availability ID format in URL",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOneAndDelete({
      _id: req.params.id,
      therapist: req.user.id,
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Availability ID format in URL",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
};