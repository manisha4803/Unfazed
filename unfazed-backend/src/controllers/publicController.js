const Therapist = require("../models/Therapist");

const getPublicProfile = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({
      slug: req.params.slug,
    }).select("-password");

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    res.status(200).json({
      success: true,
      therapist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPublicProfile,
};