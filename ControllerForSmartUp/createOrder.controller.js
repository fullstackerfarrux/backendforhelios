// import { v4 as uuid } from "uuid";

const createOrder = async (req, res) => {
  // let { total, phone_number, name, order_products, created_date, status } =
  //   req.body;
  let {
    deal_id,
    code,
    filial_code,
    person_code,
    person_name,
    person_tin,
    payment_type_code,
    self_shipment,
    order_products,
  } = req.body;

  //   console.log(req.body.order[0]);
  //   console.log(total);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  myHeaders.append("project_code", "trade");
  myHeaders.append("filial_id", "2632143");

  //    deal_time: `${deal_time}`,
  //         filial_code: "2632143",
  //         delivery_date: `${delivery_date}`,
  //         total_amount: `${total}`,
  //         person_code: `${phone_number}`,
  //         person_name: `${person_name}`,

  var raw = JSON.stringify({
    order: [
      {
        deal_id,
        deal_time: `22.06.22 16:04`,
        code,
        filial_code,
        delivery_date: `22.06.22`,
        total_amount: `1230966`,
        person_code,
        person_name,
        person_tin,
        payment_type_code,
        status: "B#N",
        self_shipment,
        order_products,
      },
    ],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://smartup.online/b/trade/txs/tdeal/order$import", requestOptions)
    .then((response) => response.text())
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log("error", error));
};

export default createOrder;
