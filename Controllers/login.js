const pool = require("../db_config");
const bcrypt = require("bcrypt");

module.exports = {
  loginUser: async (req, res) => {
    const { name, password } = req.body;
    let loginError = "Credentials do not match!";

    // db query check if user from form login is in db
    try {
      const user = await pool.query("SELECT * FROM users WHERE name = $1", [
        name,
      ]);

      //compare hashed pw from db with input mail pw using bcyrpt native compare function
      let dehashedPassword = await bcrypt
        .compare(password, user.rows[0].password)
        .then((result) => {
          return result;
        });
      console.log(dehashedPassword);

      if (user.rowCount && dehashedPassword) {
        req.session.userId = user.rows[0].id;
        console.log(req.session.userId )
        res.redirect("/users/dashboard");
      } else {
        res.redirect("/users/login");
        console.log(loginError);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
};
