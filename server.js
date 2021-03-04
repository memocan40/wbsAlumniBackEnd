const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:"123456789", resave:false, saveUninitialized: true}))
//const pool = require("./dbconfig");

const userRoutes = require("./Routes/users");
const registerRoutes = require("./Routes/register");




app.use("/users", userRoutes);
app.use("/register", registerRoutes);
app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });

app.get("/elie", async (_, res) => {
    res.send("welcome elie");
  });




const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port: PORT `));
