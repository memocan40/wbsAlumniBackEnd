const pool = require("../db_config");
 //test
module.exports = {
  newUser: async (req, res) => {
    const { picture, name, batch_id,work_status, city, github, final_project } = req.body;
    // express validator; put column names in double quotes !!!;
    try {
      const answerDB = await pool.query(
        "INSERT INTO users (picture, name, batch_id,work_status, city, github, final_project) VALUES ( $1, $2, $3, $4, $5, $6, $7)",
        [picture, name, batch_id,work_status, city, github, final_project]
      );
      res.json({
        message:
          "New user with the following values:" +
          [picture, name, batch_id,work_status, city, github, final_project],
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUsers: async (_, res) => {
    try {
      const answerDB = await pool.query("SELECT * FROM users");
      res.json({
        message: "Retrieved all user",
        code: 200,
        data: answerDB.rows,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const answerDB = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      res.json({
        message: "Retrieve user by id:" + id,
        code: 200,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const answerDB = await pool.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);
      res.json({
        message: "Delete" + id,
        code: 200,
        description: "User with id:" + id,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  updateUser: async (req, res) => {
    const{id} = req.params;
    const { picture, name, batch_id,work_status, city, github, final_project } = req.body;

    try {
      const answerDB = await pool.query(
        "UPDATE users SET picture = $1, name = $2, batch_id= $3, work_status = $4, city = $5, github = $6, final_project = $7 WHERE id = $8",
        [picture, name, batch_id,work_status, city, github, final_project, id]
      );
      res.json({
        message: "Update user with id:" + id,
        code: 200,
        description: "User update with id:" + id,
        data: answerDB.rows[0],
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  },
  loggedInUser: async(req, res) => {
    console.log("Welcome loggi in!")
  }
};
