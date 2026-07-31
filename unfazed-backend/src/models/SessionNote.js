const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor"],
      default: "Good",
    },

    nextSessionDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SessionNote", sessionNoteSchema);