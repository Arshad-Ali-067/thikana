
const Listing = require("../models/listing.js");
const profileController = require("../controllers/profile.js")
const express = require("express");
const router = express.Router();

router.get("/profile", profileController.profile);

module.exports = router;
