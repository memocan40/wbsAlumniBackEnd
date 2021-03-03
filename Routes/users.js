const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser} = require("../Controllers/users");

router.get("/", getUsers);
router.post("/create", newUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


module.exports = router;
