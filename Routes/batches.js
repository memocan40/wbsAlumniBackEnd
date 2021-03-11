const express = require("express");
const router = express.Router();
const batches_controller = require("../Controllers/batches");

router.get("/", batches_controller.getAllBatches);

module.exports = router;