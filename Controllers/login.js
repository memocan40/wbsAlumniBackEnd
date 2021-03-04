const pool = require("../db_config");
//test
module.exports = {
  loginUser: async (req, res) => {
    const {name, password } = req.body;
    console.log(name, password);
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE password = $1 AND name = $2", [password, name]
      );
      res.json({
        message:
          "User:" +
          [name] +
          "has successfully logged in.",
        code: 200,
        data: user.rows[0],
      });
      console.log(user);
    } catch (e) {
      console.log(e);
      console.log("shit");
      res.sendStatus(404);
    }
  },
};
