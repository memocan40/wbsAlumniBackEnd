const pool = require("../db_config");
 //test
module.exports = {
  newRegister: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const answerDB = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ( $1, $2, $3)",
        [name, email, password]
      );
      res.json({
        message:
          "New user with the following values:" +
          [name, email, password] + "has been created",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },


};