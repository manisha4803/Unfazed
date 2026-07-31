const express = require("express");
const router = express.Router();

const { getPublicProfile } = require("../controllers/publicController");

router.get("/:slug", getPublicProfile);

module.exports = router;