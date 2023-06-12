import client from "../db/config.js";

const updateStatus = async (req, res) => {
  let { id, type_payment } = req.body;

  let findOne = await client.query("SELECT * FROM orders WHERE id = $1", [id]);

  console.log("test", findOne);
  console.log("bez 0", findOne.rows);

  if (findOne.rows.length > 0) {
    let update = await client.query(
      "UPDATE orders SET type_payment = $1 where id = $2",
      [type_payment, id]
    );

    console.log(update);

    res.status(200).send({ orders: findOne.rows });
  } else {
    res.status(400).send({ message: "Not orders" });
  }
};

export default updateStatus;
