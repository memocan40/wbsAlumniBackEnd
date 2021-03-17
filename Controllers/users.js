//dependencies for the register
const pool = require("../db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validator = require("node-email-validation");
const nodemailer = require("nodemailer");

module.exports = {
  confirmEmail: async(req, res) => {
    try {
      console.log('email confirmed');
    }catch (e) {
      res.send(e);
    }

  },
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

      if(validEmail) {
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
              "In order to use our plattform you have to verify your acount stay in touch!" +
              "< br />" +
              `<a href='https://hidden-shelf-31461.herokuapp.com/users/register/confirm/${answerDB.rows[0].id}'><a/>`, // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        } catch (e) {

          console.log(res);

          res.send(e);

        }
      }else {
        res.send(e);
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
      first_name,
      last_name,
      batch,
      city,
      interests,
      work_status,
      github,
      linkedin,
      final_project,
      first_login,
    } = req.body;

    try {
      const answerDB = await pool.query(
        "UPDATE users SET first_name = $1, last_name = $2, batch= $3, city = $4, interests = $5, work_status = $6, github = $7, linkedin = $8, final_project = $9, first_login = $10 WHERE id = $11",
        [
          first_name,
          last_name,
          batch,
          city,
          interests,
          work_status,
          github,
          linkedin,
          final_project,
          first_login,
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
  updateUserPicture: async (req, res) => {
    const { id } = req.params;

    if (req.extensionWrong) {
      res.status(400).send("wrong extension");
      return;
    }

    if (!req.file) {
      res.status(400).send("please send an image");
      return;
    }

    try {
      const answerDB = await pool.query(
        `UPDATE users SET picture = $1  WHERE id = $2;`,
        [req.file.filename, id]
      );

      res.json({
        image: req.file.filename,
        data: answerDB.rows[0],
        code: 200,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserByCity: async (req, res) => {
    const { city } = req.params;
    try {
      const answerDB = await pool.query("SELECT * FROM users WHERE city = $1", [
        city,
      ]);
      res.json({
        message: "Retrieve users by city:" + city,
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserByBatch: async (req, res) => {
    const { batch } = req.params;
    try {
      const answerDB = await pool.query(
        "SELECT * FROM users WHERE batch = $1",
        [batch]
      );
      res.json({
        message: "Retrieve users by batch:" + batch,
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserByInterest: async (req, res) => {
    const { interest } = req.params;
    try {
      // to try on this middleware

      // Select * FROM interests
      // JOIN interests_user on interests.id = interests_user.interests.id
      // JOIN users on users.id = interests_user.user_id
      // WHERE interests.name = 'CSS' OR interests.name = 'JS'

      const answerDB = await pool.query(
        "SELECT * FROM users WHERE interests = $1",
        [interest]
      );
      res.json({
        message: "Retrieve users by interest:" + interest,
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserByWork_Status: async (req, res) => {
    const { workstatus } = req.params;
    try {
      const answerDB = await pool.query(
        "SELECT * FROM users WHERE work_status = $1",
        [workstatus]
      );
      res.json({
        message: "Retrieve users by work status:" + workstatus,
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
};
