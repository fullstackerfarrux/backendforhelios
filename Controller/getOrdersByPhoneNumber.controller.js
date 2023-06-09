import client from "../db/config.js";

const getOrderByPhoneNumber = async (req, res) => {
  let { phone_number } = req.body;

  let findAllOrders = await client.query(
    "SELECT * FROM orders WHERE phone_number = $1",
    [phone_number]
  );

  if (findAllOrders.rows.length > 0) {
    res.status(200).send({ orders: findAllOrders.rows });
  } else {
    res.status(400).send({ message: "Not orders" });
  }
};

export default getOrderByPhoneNumber;
