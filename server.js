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

 


//Importing  the user Route
const userRoutes = require("./Routes/users");
const work_status_Routes = require("./Routes/work_status");
const { nextTick } = require("process");




const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// SESSION middleware
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





const storage = multer.diskStorage({
  destination: (_,__ , cb) => {
    cb(null, './uploads')
  },
  filename:  (_,file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});
 
const upload = multer({ storage: storage })

//define static serving
app.use("/images", express.static("uploads"));
app.post("/upload-profile-pic", upload.single("profile_pic"), (req,res) => {
 if(!req.file){
   res.status(400).send("please send an image");
   return;
 }
 res.send(`<img src="http://localhost:3000/images/profile_pic.jpg"/>`)
});



app.use("/users", userRoutes);
app.use("/work_status", work_status_Routes);

app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });







  



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



app.listen(PORT, () => console.log(`Server running on port: PORT `));
http.listen(3005, console.log(`chatserverServer running on port ${PORT}`));
