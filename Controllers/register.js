// dependencies
const pool = require("../db_config");
let passwordHash = require("password-hash");
let validator = require("node-email-validation");
const nodemailer = require("nodemailer");

module.exports = {
  newRegister: async (req, res) => {
    // package applied for hashing pw
    let hashedPassword = passwordHash.generate(req.body.password);
    const { name, email } = req.body;
    console.log(name, email);
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
        const {MAIL_PW, MAIL_ACCOUNT} = process.env;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "mail.gmx.net",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: MAIL_ACCOUNT,
            pass: MAIL_PW,
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from:  MAIL_ACCOUNT, // sender address
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
};
