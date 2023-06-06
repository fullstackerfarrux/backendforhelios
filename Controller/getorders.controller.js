import client from "../db/config.js";

const getOrder = async (req, res) => {
  let get = await client.query("SELECT MAX(id) FROM orders");

  console.log(get.rows);
  res.status(200).json(get.rows[0]);
};

export default getOrder;
