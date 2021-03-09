const express = require("express");
const router = express.Router();

const Work_status_controller = require("../Controllers/work_status");



router.get("/", Work_status_controller.getallWork_Status);



module.exports = router;