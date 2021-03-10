const express = require("express");
const router = express.Router();
const interests_controller = require("../Controllers/interests");

router.get("/", interests_controller.getAllInterests);

module.exports = router;