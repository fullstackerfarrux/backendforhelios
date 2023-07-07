export const filter = async (req, res) => {
  let { model, tip, min_price, max_price } = req.params;
  console.log("req", req.params);
  console.log("tip", tip);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const products = [];
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const nowDate = new Date(`${months[month]} ${day}, ${year - 1}`);

  await fetch("http://localhost:4444/smartup/getProducts", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => products.push(...data))
    .catch((err) => res.send(err));

  let result = products
    .filter((el) =>
      model != false ? el.name.includes(model.toUpperCase()) : true
    )
    .filter((el) => (tip == "popular" ? el.quantity * 1 >= 100 : true))
    .filter((el) => (min_price != false ? +el.price >= +min_price : true))
    .filter((el) => (max_price != false ? +el.price <= +max_price : true));

  const newResult = [];

  if (tip == "new") {
    for (let i = 0; i < result.length; i++) {
      let text = "";
      const productDay = result[i]?.created_date?.slice(0, 2);
      const productMonth = [];
      const productYear = result[i]?.created_date?.slice(6, 10);

      if (result[i]?.created_date?.slice(3, 5).search("0") == 0) {
        productMonth.push(result[i]?.created_date?.slice(4, 5));
      } else {
        productMonth.push(result[i]?.created_date?.slice(3, 5));
      }
      const productDate = new Date(
        `${months[+productMonth[0]]} ${productDay}, ${productYear}`
      );

      if (productDate > nowDate) {
        text = "katta";
      } else if (productDate < nowDate) {
        text = "kichik";
      } else {
        text = "teng";
      }

      if (text == "katta") {
        newResult.push(result[i]);
      }
    }
    return res.send(newResult);
  }

  res.send(result);
};
