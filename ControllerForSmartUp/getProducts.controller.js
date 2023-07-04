export const getProducts = async (req, res) => {
  let result = [];
  var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  //   myHeaders.append("project_code", "trade");
  //   myHeaders.append("filial_id", "2632143");

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

  let products = [];

  fetch(
    "https://smartup.online/b/anor/mxsx/mr/inventory$export",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let nmadr = [];
      for (let i = 0; i < result.inventory; i++) {
        console.log(result.inventory[i].code);
        let product = {};
        product.code = result.inventory[i].code;
        let split_name = result.inventory[i].name.split(" ");
        nmadr.push(split_name.length);
      }
      res.send(nmadr);
    })
    .catch((error) => console.log("error", error));
};
