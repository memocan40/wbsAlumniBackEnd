const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser} = require("../Controllers/users");

router.get("/", getUsers);
router.post("/", newUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
