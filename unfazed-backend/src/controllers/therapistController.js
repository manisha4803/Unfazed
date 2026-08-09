const Therapist = require("../models/Therapist");

const getProfile = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.user.id).select("-password");

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
    console.error("getProfile error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, bio, languages, specializations, specialization, experience, phone } = req.body;

    const therapist = await Therapist.findById(req.user.id);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    if (name !== undefined) therapist.name = name;
    if (bio !== undefined) therapist.bio = bio;
    if (languages !== undefined) therapist.languages = languages;
    if (specializations !== undefined) therapist.specializations = specializations;
    if (specialization !== undefined) therapist.specialization = specialization;
    if (experience !== undefined) therapist.experience = experience;
    if (phone !== undefined) therapist.phone = phone;

    await therapist.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      therapist,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required",
      });
    }

    const therapist = await Therapist.findById(req.user.id);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, therapist.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    therapist.password = await bcrypt.hash(newPassword, 10);

    await therapist.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image file to upload (Key name must be 'profileImage')",
      });
    }

    const therapist = await Therapist.findById(req.user.id);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    therapist.profileImage = req.file.filename;

    await therapist.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: therapist.profileImage,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    });

  } catch (error) {
    console.error("uploadProfileImage error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
};