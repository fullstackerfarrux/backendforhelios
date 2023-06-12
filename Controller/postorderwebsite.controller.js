import client from "../db/config.js";

const postOrderByWebSite = async (req, res) => {
  let {
    created_date,
    products,
    total,
    undiscount,
    dicount,
    type_payment,
    username,
    users_location_text,
    user_location_cordinate,
    shipping_method,
    payment_method,
    comment,
    phone_number,
  } = req.body;
  let create = await client.query(
    "INSERT INTO orders(created_date, products, total, undiscount, dicount, type_payment, username, users_location_text, user_location_cordinate, shipping_method, payment_method, comment, phone_number) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
    [
      created_date,
      products,
      total,
      undiscount,
      dicount,
      type_payment,
      username,
      users_location_text,
      user_location_cordinate,
      shipping_method,
      payment_method,
      comment,
      phone_number,
    ]
  );

  if (create.command == "INSERT") {
    res.status(200).send({ message: "Created !", code: "CREATED" });
  } else {
    res.status(400).send({ message: "Doesn't created" });
  }
};

export default postOrderByWebSite;
