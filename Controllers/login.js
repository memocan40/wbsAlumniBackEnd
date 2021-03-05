  
const pool = require("../db_config");

module.exports = {
  loginUser: async (req, res) => {
    const {name, password } = req.body;
    let loginError;
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE password = $1 AND name = $2", [password, name]
      );
      if(user.rowCount) {
        res.redirect('/users/dashboard');
      }else {
        loginError = "Credentials do not match!";
        console.log(loginError);
      }
    } catch (e) {
      res.redirect("back");
      console.log(e);
      console.log("shit");
      res.sendStatus(404);
    }
  },
};