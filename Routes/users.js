const express = require("express");
const router = express.Router();
const upload = require("../multer");

const {getUsers,newUser, getUserById, updateUser, deleteUser, loggedInUser,updateUserPicture} = require("../Controllers/users");
const {loginUser, logoutUser} = require("../Controllers/login");


router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", loggedInUser);
router.post("/register", newUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/upload-profile-pic/:id", upload.single("profile_pic"),updateUserPicture );


module.exports = router;
