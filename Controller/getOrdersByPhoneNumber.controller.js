import client from "../db/config.js";
import getOrder from "./getorders.controller.js";

const getOrderByPhoneNumber = async (req, res) => {
  let { phone_number } = req.body;

  let findAllOrders = await client.query(
    "SELECT * FROM orders WHERE phone_number = $1",
    [phone_number]
  );

  console.log(findAllOrders[0]);
  console.log("bez 0", findAllOrders);

  if (findAllOrders.length > 0) {
    res.status(200).send({ orders: findAllOrders.rows });
  } else {
    res.status(400).send({ msg: "Not orders" });
  }
};

export default getOrderByPhoneNumber;
