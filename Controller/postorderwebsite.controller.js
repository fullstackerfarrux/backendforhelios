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
    "INSERT INTO orders(created_date, products, total, undiscount, dicount, type_payment, username, users_location_text, user_location_cordinate, shipping_method, payment_method, comment, phone_number) values($1, $2, $3, $4, $5, $6)",
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

  console.log(create);

  // if (products.length) {
  //   res.status(200).send({ message: "Created !", code: "CREATED" });
  // } else {
  //   res.status(400).send({ message: "Doesn't created" });
  // }
};

export default postOrderByWebSite;
