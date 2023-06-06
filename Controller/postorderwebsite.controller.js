import client from "../db/config.js";

const postOrderByWebSite = async (req, res) => {
  let {
    products,
    total,
    type_pay,
    users_location_text,
    comment,
    phone_number,
  } = req.body;
  let create = await client.query(
    "INSERT INTO orders(products, total, type_pay, users_location_text, comment, phone_number) values($1, $2, $3, $4, $5, $6)",
    [products, total, type_pay, users_location_text, comment, phone_number]
  );

  if (products.length) {
    res.status(200).send({ msg: "ok" });
  } else {
    res.status(400).send({ msg: "Doesn't created" });
  }
};

export default postOrderByWebSite;
