import client from "../db/config.js";

const updateStatus = async (req, res) => {
  let { id } = req.body;

  let findOne = await client.query("SELECT * FROM orders WHERE id = $1", [id]);

  console.log("test", findOne);
  console.log("bez 0", findOne.rows);

  if (findOne.rows.length > 0) {
    res.status(200).send({ orders: findOne.rows });
  } else {
    res.status(400).send({ message: "Not orders" });
  }
};

export default updateStatus;
