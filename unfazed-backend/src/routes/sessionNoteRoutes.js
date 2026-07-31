const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSessionNote,
  getSessionNotes,
} = require("../controllers/sessionNoteController");

const router = express.Router();

router.post("/", authMiddleware, createSessionNote);

router.get("/", authMiddleware, getSessionNotes);

module.exports = router;