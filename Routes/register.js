const express = require("express");
const router = express.Router();

const {newRegister} = require("../Controllers/register");


router.post("/", newRegister);

module.exports = router;
