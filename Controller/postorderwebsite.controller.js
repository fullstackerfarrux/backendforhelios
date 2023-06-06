import client from "../db/config.js";

const postOrderByWebSite = async (req, res) => {
  let { products, total } = req.body;
  let create = await client.query(
    "INSERT INTO orders(products, total) values($1, $2)",
    [products, total]
  );

  if (products.length) {
    res.status(200).send({ msg: "ok" });
  }
};

export default postOrderByWebSite;
