const express = require("express");
const upload = require("../multer_object");
const router = express.Router();

router.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  if (!req.file) {
    res.status(400).send("Please send in an image");
    return;
  }
  res.send(
    `<img src="http://localhost:3000/images/${req.file.filename}.jpeg" />`
  );
});

router.post("/upload-cat-pics", upload.array("cat_pics"), (req, res) => {
  if (!req.files) {
    res.status(400).send("Please send in an image");
    return;
  }
  let imageString = "";

  req.files.forEach((file) => {
    imageString += `<img src="http://localhost:3000/images/${file.originalname}" />`;
  });
  console.log(imageString);
  res.send(imageString);
});

module.exports = router;