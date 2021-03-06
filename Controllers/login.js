const pool = require("../db_config");
const bcrypt = require("bcrypt");

module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let loginError = "Credentials do not match!";

    // db query check if user from form login is in db
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
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
        console.log(req.session);
        console.log(user.rows[0].id);

        // res.redirect("/users/dashboard");
        // res.json(req.session);

        res.json({
          message: "Successful login. Welcome " + user.rows[0].username,
          code: 200,
          data: user.rows[0],
        });
      }else if (user.rowCount &&  !dehashedPassword) {
        res.json({
          message: "Wrong password!",
          code: 401,
        });
        console.log(res);
      }


      else {
        // res.redirect("/users/login");
        console.log(loginError);
        res.json({
          message: loginError,
          code: 401,
        });
      }
    } catch (e) {
      res.redirect("back");
      console.log(e);
      res.sendStatus(404);
    }
  },
  logoutUser: async (req, res) => {
    console.log(req.session);
    req.session.destroy(function (err) {
      res.json({
        message: "Successful logout",
        code: 200,
      });
    });
  },
};
