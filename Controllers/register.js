const pool = require("../db_config");
let passwordHash = require('password-hash');
let validator = require("node-email-validation");


module.exports = {
  newRegister: async (req, res) => {
    let hashedPassword = passwordHash.generate(req.body.password);
    const { name, email} = req.body;
    let validEmail = validator.is_email_valid(req.body.email);
   if(validEmail) {
    try {


      const answerDB = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ( $1, $2, $3)",
        [name, email, hashedPassword]
      );
      res.json({
        message:
          "New user with the following values:" +
          [name, email, hashedPassword] + "has been created",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
   }{
     console.log('Please provide a valid email');
   }

  },


};