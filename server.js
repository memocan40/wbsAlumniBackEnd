const dotenv = require("dotenv");
dotenv.config();
const pool = require("./db_config");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const pgsession = require('connect-pg-simple')(session);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const userRoutes = require("./Routes/users");

const { PORT, SESS_ID, SESSION_SECRET } = process.env;


// SESSION middleware
app.use(session({
  store: new pgsession({
    pool : pool,                // Connection pool
    tableName : 'user_sessions'   //
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
app.get("/", async (_, res) => {
    res.send("welcome to our api");
  });

app.get("/elie", async (_, res) => {
    res.send("welcome elie");
  });






app.listen(PORT, () => console.log(`Server running on port: PORT `));
