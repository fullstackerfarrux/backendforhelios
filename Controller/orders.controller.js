import client from "../db/config.js";

const postOrder = async (req, res) => {
  let { products, total, by_username } = req.body;

  console.log(products, total, by_username);

  // let create = await client.query(
  //   "INSERT INTO orders(products, total, by_username) values($1, $2, $3)",
  //   [products, total, by_username]
  // );
};

export default postOrder;
