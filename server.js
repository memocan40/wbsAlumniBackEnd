const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");




//io.on('connection', (socket) => {
 // console.log('a user connected');
 // socket.on('disconnect', () => {
  //  console.log('user disconnected');
 // });
//});


const userRoutes = require("./Routes/users");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });






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
const { PORT } = process.env || 3000;
const {CHATSERV}=process.env || 3005;


app.listen(PORT, () => console.log(`Server running on port: PORT `));
http.listen(3005, console.log(`chatserverServer running on port ${PORT}`));
