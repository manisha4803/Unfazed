const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createClient,
  getClients,
} = require("../controllers/clientController");

const router = express.Router();

router.post("/", authMiddleware, createClient);

router.get("/", authMiddleware, getClients);

module.exports = router;