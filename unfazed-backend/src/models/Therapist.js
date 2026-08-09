const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    specializations: [
      {
        type: String,
      },
    ],

    experience: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    languages: [
      {
        type: String,
      },
    ],
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
  
);

module.exports = mongoose.model("Therapist", therapistSchema);