const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const userRoutes = require("./Routes/users");
const registerRoutes = require("./Routes/register");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/register", registerRoutes);
app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });


const { PORT } = process.env;

app.listen(PORT || 3000 , () => console.log(`Server running on port: PORT `));
