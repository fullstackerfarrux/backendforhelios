export const getProducts = async (req, res) => {
  let result = [];
  let products = [];
  let price = [];
  let remainder = [];
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  myHeaders.append("filial_id", "2632143");
  myHeaders.append("project_code", "trade");

  var raw = JSON.stringify({
    code: "",
    begin_created_on: "",
    end_created_on: "",
    begin_modified_on: "",
    end_modified_on: "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  await fetch(
    "https://smartup.online/b/anor/mxsx/mr/inventory$export",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      products.push(result.inventory);
    })
    .catch((error) => console.log("error", error));

  var requestOptionsForPrice = {
    method: "POST",
    headers: myHeaders,
  };

  await fetch(
    "https://smartup.online/b/anor/mxs/mkf/product_price$export",
    requestOptionsForPrice
  )
    .then((response) => response.json())
    .then((result) => {
      price.push(result.inventory);
    })
    .catch((error) => console.log("error", error));

  var rawForRemind = JSON.stringify({
    warehouse_codes: [
      {
        warehouse_code: "",
      },
    ],
    filial_code: "",
    begin_date: "15.02.2023",
    end_date: "15.03.2023",
  });

  var requestOptionsForRemind = {
    method: "POST",
    headers: myHeaders,
    body: rawForRemind,
  };

  await fetch(
    "https://smartup.online/b/anor/mxsx/mkw/balance$export",
    requestOptionsForRemind
  )
    .then((response) => response.json())
    .then((result) => {
      remainder.push(result.balance);
    })
    .catch((error) => console.log("error", error));

  for (let i = 0; i < products[0].length; i++) {
    let resProduct = {};
    resProduct.code = products[0][i].code;
    const splitName = products[0][i].name.split(" ");
    const spliceName = splitName.splice(1);
    const name = spliceName.toString().replaceAll(",", " ");
    resProduct.name = name;
    resProduct.state = products[0][i].state;
    resProduct.order_no = products[0][i].order_no;
    for (let c = 0; c < price[0].length; c++) {
      if (products[0][i].code == price[0][c].inventory_code) {
        let checkPrice = false;
        for (let j = 0; j < price[0][c].price_type.length; j++) {
          if (price[0][c].price_type[j].price_type_code == "123") {
            resProduct.price = price[0][c].price_type[j].price;
            checkPrice = true;
          } else {
            checkPrice = false;
          }
        }
        if (checkPrice == false) {
          resProduct.price = price[0][c]?.price_type[0]?.price;
        }
      }
    }
    for (let c = 0; c < remainder[0].length; c++) {
      if (products[0][i].code == remainder[0][c].product_code) {
        resProduct.product_id = remainder[0][c].product_id;
        resProduct.quantity = remainder[0][c].quantity;
        resProduct.created_date = remainder[0][c].date;
      }
    }
    result.push(resProduct);
  }

  res.send(result);
};
