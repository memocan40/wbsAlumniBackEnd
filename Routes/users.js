const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser} = require("../Controllers/users");
const {loginUser, logoutUser} = require("../Controllers/login");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", loggedInUser);
router.post("/register", newUser);
router.get("/", getUsers);
<<<<<<< HEAD
router.post("/create", newUser);
=======
>>>>>>> ebe13cce82f12a2f274e909e3368090609bc7e36
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


module.exports = router;
