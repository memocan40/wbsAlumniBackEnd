
//import multer and path
const multer = require("multer");
const path = require("path");


//create a storage 
const storage = multer.diskStorage({
    destination: (_,__ , cb) => {
      cb(null, './uploads')
    },
    filename:  (_,file, cb) => {
      cb(null, file.fieldname + path.extname(file.originalname)); // profile_pic.jpeg 
    },
  
    onError: (err, next) => next(),
  });
  
  
  //create the file filter
  const fileFilter = (req, file, cb) => {
    // checking file extensions if else
    const fileExt = path.extname(file.originalname).substring(1); // jpeg, png, jpg
    const arrayOfAcceptedExt = ["jpg", "jpeg","png"];
    if (!arrayOfAcceptedExt.includes(fileExt)) {
      req.extensionWrong = true;
      cb(null, true);
    }
  
  };
  
  
  //export upload that contains the storage and the file filter
  module.exports = multer({ storage: storage, fileFilter:fileFilter });