//dependencies for the register
const pool = require("../db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validator = require("node-email-validation");
const nodemailer = require("nodemailer");


module.exports = {
  newUser: async (req, res) => {
    const { user, email, password } = req.body;

    // implement hashing input password with bycrypt
    let hashedPassword = await bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        return hash;
      });
    // package applied checking for checking if email valid
    let validEmail = validator.is_email_valid(email);
    if (validEmail) {
      try {
        const answerDB = await pool.query(
          "INSERT INTO users (username, email, password) VALUES ( $1, $2, $3)",
          [user, email, hashedPassword]
        );
        res.json({
          message:
            "New user with the following values:" +
            [user, email, hashedPassword] +
            "has been created",
          code: 200,
          data: answerDB.rows[0],
        });
        const { MAIL_PW, MAIL_ACCOUNT, MAIL_HOST, MAIL_PORT } = process.env;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: MAIL_HOST,
          port: MAIL_PORT,
          secure: false, // true for 465, false for other ports
          auth: {
            user: MAIL_ACCOUNT,
            pass: MAIL_PW,
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: MAIL_ACCOUNT, // sender address
          to: email, // list of receivers
          subject: "Successful register at WBS Alumni", // Subject line
          html:
            "Dear " +
            user +
            "," +
            "<br/>" +
            "your account has been successfully initialized!" +
            "<br />" +
            "Enjoy our plattform and stay in touch!", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      } catch (e) {
        console.log(e);
        res.sendStatus(404);
      }
    }
  },
  getUsers: async (req, res) => {
    console.log(req.session);
    try {
      const answerDB = await pool.query("SELECT * FROM users");
      res.json({
        message: "Retrieved all user",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const answerDB = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      res.json({
        message: "Retrieve user by id:" + id,
        code: 200,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const answerDB = await pool.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);
      res.json({
        message: "Delete" + id,
        code: 200,
        description: "User with id:" + id,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  updateUser: async (req, res) => {



    const { id } = req.params;
    const {
      picture,
      first_name,
      last_name,
      batch,
      work_status_id,
      city_id,
      github,
      final_project,
    } = req.body;

    try {
      const answerDB = await pool.query(
        "UPDATE users SET picture = $1, first_name = $2, batch= $3, work_status_id = $4, city_id = $5, github = $6, final_project = $7 WHERE id = $8",
        [
          picture,
          first_name,
          batch,
          work_status_id,
          city_id,
          github,
          final_project,
          id,
        ]
      );
      res.json({
        message: "Update user with id:" + id,
        code: 200,
        description: "User update with id:" + id,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  loggedInUser: async (req, res) => {
    //instead of session app
    // setIntervall date.now - session.creation.time
    console.log("Welcome loggi in!");
  },
};
