const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser} = require("../Controllers/users");
const {loginUser} = require("../Controllers/login");

router.post("/login", loginUser);
router.get("/dashboard", loggedInUser);
router.get("/", getUsers);
router.post("/", newUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
