//dependencies for the register
const pool = require("../db_config");


module.exports = {
 
  getAllInterests: async (_, res) => {

    try {
      const answerDB = await pool.query("SELECT * FROM interests");
      res.json({
        message: "Retrieved all interests",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }
}