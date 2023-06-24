export default getOrders = async (req, res) => {
  let { phone_number } = req.body;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  myHeaders.append("project_code", "trade");
  myHeaders.append("filial_id", "2632143");

  var raw = JSON.stringify({
    filial_codes: [
      {
        filial_code: "2632143",
      },
    ],
    filial_code: "",
    external_id: "",
    deal_id: "",
    begin_deal_date: "",
    end_deal_date: "",
    delivery_date: "",
    begin_created_on: "",
    end_created_on: "",
    begin_modified_on: "",
    end_modified_on: "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://smartup.online/b/trade/txs/tdeal/order$export", requestOptions)
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
};
