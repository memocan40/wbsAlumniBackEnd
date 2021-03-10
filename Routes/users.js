const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser,getUserByBatch} = require("../Controllers/users");
const {loginUser, logoutUser} = require("../Controllers/login");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", loggedInUser);
router.post("/register", newUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);


//additional endpoints to make
// router.get("/:city ", getUserByCity);
// router.get("/workstatus = ", getUserBywork_status);
router.get("/:batch", getUserByBatch);
// router.get("/preference = ", getUserBypreference);

module.exports = router;
