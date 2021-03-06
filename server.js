//Importing and initializing dotenv
const dotenv = require("dotenv");
dotenv.config();


//Importing modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//Initializing the session Object
app.use(session(
  {secret:"123456789", resave:false, saveUninitialized: true}))


//Initializing PORT
  const { PORT } = process.env || 3000;


//Importing the users Route
const userRoutes = require("./Routes/users");


app.use("/users", userRoutes);

app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });


//Listen to the port
app.listen(PORT, () => console.log(`Server running on port: PORT `));