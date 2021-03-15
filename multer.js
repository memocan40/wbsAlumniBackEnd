
const multer = require('multer');
const path = require ('path');


//Multer

//create a storage that has a destination and can name files
const storage = multer.diskStorage({
    destination: (_,__ , cb) => {
      cb(null, './uploads')
    },
    filename:  (_,file, cb) => {
      cb(null, Date.now() + file.fieldname + path.extname(file.originalname)); // profile_pic.jpeg 
    },
  
    onError: (err, next) => next(),
  });
  
  const fileFilter = (req, file, cb) => {
    // checking file extensions if else
    const fileExt = path.extname(file.originalname).substring(1); // jpeg, png, jpg
    const arrayOfAcceptedExt = ["jpg", "jpeg","png"];
    if (!arrayOfAcceptedExt.includes(fileExt)) {
      req.extensionWrong = true;
      cb(null, false);
    }
    cb(null, true);
  
  };
   
  
  
  const upload = multer({storage, fileFilter})
  
  module.exports = upload;