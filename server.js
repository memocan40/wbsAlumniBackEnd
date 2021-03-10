//Importing and initializing dotenv
const dotenv = require("dotenv");
dotenv.config();
const pool = require("./db_config");


//Importing modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const pgsession = require('connect-pg-simple')(session);




//Importing  the user Route
const userRoutes = require("./Routes/users");
const work_status_Route = require("./Routes/work_status");
const interests_Route = require("./Routes/interests");



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, SESS_ID, SESSION_SECRET } = process.env;



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



app.use("/users", userRoutes);
app.use("/work_status", work_status_Route);
app.use("/interests", interests_Route);

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
