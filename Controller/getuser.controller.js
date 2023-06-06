import client from "../db/config.js";

const getuser = async (req, res) => {
  let get = await client.query("SELECT * FROM allusers");
  res.status(200).json(get.rows[0]);
};

export default getuser;
