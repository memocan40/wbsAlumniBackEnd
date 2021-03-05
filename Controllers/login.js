const pool = require("../db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  loginUser: async (req, res) => {
    const { name, password } = req.body;
    let loginError;

    bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt.hash(myPlaintextPassword, salt).then((hash) => {
        console.log(hash);
      });
    });

    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE password = $1 AND name = $2",
        [password, name]
      );
      console.log(user.rows[0].id);
      // console.log(passwordHash.verify(password, user.rows[0].id)); // true
      //   console.log(user);

      if (user.rowCount) {
        res.redirect("/users/dashboard");
      } else {
        loginError = "Credentials do not match!";
        console.log(loginError);
      }
    } catch (e) {
      console.log(e);
      console.log("shit");
      res.sendStatus(404);
    }
  },
};
