//Importing and initializing dotenv
const dotenv = require("dotenv");
dotenv.config();



//Importing modules
const pool = require("./db_config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const pgsession = require('connect-pg-simple')(session);
const multer = require('multer');
const path = require ('path');
const { PORT, SESS_ID, SESSION_SECRET } = process.env;

 


//Routes imports
const userRoutes = require("./Routes/users");
const work_status_Routes = require("./Routes/work_status");
const interests_Routes = require("./Routes/interests");





const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//Sessions


// Connecting the sessions to our db
app.use(session({
  store: new pgsession({
    pool : pool,                // Connection pool
    tableName : 'users_session'   //
  }),
  name: SESS_ID,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,  // = 1 hour
    sameSite: true,
    secure: false, // has to be secure in production
  }
}))



//Multer

//create a storage that has a destination and can name files
const storage = multer.diskStorage({
  destination: (_,__ , cb) => {
    cb(null, './uploads')
  },
  filename:  (_,file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname)); // profile_pic.jpeg 
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

};
 
const upload = multer({ storage: storage, fileFilter:fileFilter })

//define static serving
//on images I want you to server all the files that are in uploads
app.use("/images", express.static("uploads"));


app.get("/form", (req, res) =>
  res.sendFile(path.join(__dirname, "index.html"))
);


app.post("/upload-profile-pic", upload.single("profile_pic"), (req,res) => {
  console.log(" in second middleware");
  
  if (req.extensionWrong) {
    res.status(400).send("wrong extension");
  }
  
  
  if(!req.file){
   res.status(400).send("please send an image");
   return;
 }
 //for the database we need to save /profile_pic.jpg (as per Aria´s video)
 res.send(`<img src="http://localhost:3000/images/profile_pic.jpg"/>`)
});




//Socket io


//create and connect to chat server(socket.io)
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on('connect', (socket) => {


  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

const {CHATSERV}=process.env || 3005;




app.use("/users", userRoutes);
app.use("/work_status", work_status_Routes);
app.use("/interests", interests_Routes);

app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });



app.listen(PORT, () => console.log(`Server running on port: PORT `));
http.listen(3005, console.log(`chatserverServer running on port ${PORT}`));
