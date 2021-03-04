//dependencies for the register
let bcrypt = require("bcrypt");
let validator = require("node-email-validation");
const nodemailer = require("nodemailer");

const pool = require("../db_config");
 //test
module.exports = {
  newUser:  async (req, res) => {
    // package applied for hashing pw
    let hashedPassword = bcrypt.hash(password, 10);
    const { name, email } = req.body;
    // package applied checking for checking if email valid
    let validEmail = validator.is_email_valid(req.body.email);
    if (validEmail) {
      try {
        const answerDB = await pool.query(
          "INSERT INTO users (name, email, password) VALUES ( $1, $2, $3)",
          [name, email, hashedPassword]
        );
        res.json({
          message:
            "New user with the following values:" +
            [name, email, hashedPassword] +
            "has been created",
          code: 200,
          data: answerDB.rows,
        });

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "mail.gmx.net",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'wbs.alumni@gmx.de',
            pass: 'Autobahn84.',
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Register Setup" <wbs.alumni@gmx.de>', // sender address
          to: email, // list of receivers
          subject: "Hello", // Subject line
          text: "You have registered successfully!", // plain text body
          html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      } catch (e) {
        console.log(e);
        res.sendStatus(404);
      }
    }

  
},
  getUsers: async (_, res) => {
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
    const{id} = req.params;
    const { picture, name, batch_id,work_status, city, github, final_project } = req.body;

    try {
      const answerDB = await pool.query(
        "UPDATE users SET picture = $1, name = $2, batch_id= $3, work_status = $4, city = $5, github = $6, final_project = $7 WHERE id = $8",
        [picture, name, batch_id,work_status, city, github, final_project, id]
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
};
