//dependencies for the register
const pool = require("../db_config");


module.exports = {
 
  getallWork_Status: async (_, res) => {

    try {
      const answerDB = await pool.query("SELECT * FROM work_status");
      res.json({
        message: "Retrieved all work status",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }
}