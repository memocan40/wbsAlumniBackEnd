  
const pool = require("../db_config");
const bcrypt = require("bcrypt");

module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let loginError = "Credentials do not match!";

    // db query check if user from form login is in db
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email
      ]);

      //compare hashed pw from db with input mail pw using bcyrpt native compare function
      let dehashedPassword = await bcrypt
        .compare(password, user.rows[0].password)
        .then((result) => {
          return result;
        });
      console.log(dehashedPassword);

      if (user.rowCount && dehashedPassword) {
        // session start here
        req.session.userId = user.rows[0].id;
        console.log(req.session )
        // res.json({session});
        res.redirect("/users/dashboard");
      } else {
        // res.redirect("/users/login");
        console.log(loginError);
      }
    } catch (e) {
      res.redirect("back");
      console.log(e);
      res.sendStatus(404);
    }
  },
  logoutUser: async (req, res) => {
    req.session.destroy(function() {
      console.log('sessions destroyed') // redirect to login
    })
  }
};
