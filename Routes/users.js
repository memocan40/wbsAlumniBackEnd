const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser} = require("../Controllers/users");
const {loginUser} = require("../Controllers/login");

router.get("/", getUsers);
router.post("/create", newUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


module.exports = router;
