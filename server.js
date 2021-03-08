const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const io = require('socket.io');

//io.on('connection', (socket) => {
 // console.log('a user connected');
 // socket.on('disconnect', () => {
  //  console.log('user disconnected');
 // });
//});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


const userRoutes = require("./Routes/users");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Server running on port: PORT `));
