const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//const pool = require("./dbconfig");

const userRoutes = require("./Routes/users");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);


const { PORT } = process.env;

app.listen(3000, () => console.log(`Server running on port: 3000 `));
