import client from "../db/config.js";

const postOrder = async (req, res) => {
  let { products, total } = req.body;

  console.log(products, total);

  let create = await client.query(
    "INSERT INTO orders(products, total) values($1, $2)",
    [products, total]
  );
};

export default postOrder;
