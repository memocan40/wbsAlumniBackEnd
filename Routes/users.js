const express = require("express");
const router = express.Router();

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser,getUserByBatch,getUserByCity,getUserByInterest,getUserByWork_Status} = require("../Controllers/users");
const {loginUser, logoutUser} = require("../Controllers/login");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", loggedInUser);
router.post("/register", newUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);


//New endpoints
router.get("/city/:city", getUserByCity);
router.get("/workstatus/:workstatus", getUserByWork_Status);
router.get("/batch/:batch", getUserByBatch);
router.get("/interest/:interest", getUserByInterest);

module.exports = router;
