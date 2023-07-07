export const pageOffset = async (req, res) => {
  let { page_limit, page_offset } = req.body;
  const products = [];

  await fetch("https://api.kaizen-group.uz/smartup/getProducts", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => products.push(data))
    .catch((err) => res.send(err));

  let splice1 = page_offset * page_limit - page_offset;
  let result = products[0].splice(splice1, page_offset);

  res.send(result);
};
