import client from "../db/config.js";

const getuser = async (req, res) => {
  let get = await client.query("SELECT * FROM users");
  res.status(200).json(get.rows[0]);
};

export default getuser;
