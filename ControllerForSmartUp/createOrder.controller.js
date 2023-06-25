// import { v4 as uuid } from "uuid";

const createOrder = async (req, res) => {
  let {
    deal_time,
    created_date,
    total,
    phone_number,
    client_name,
    person_latitude,
    person_longitude,
    note,
    order_products,
    self_shipment,
  } = req.body;
  console.log(order_products);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  myHeaders.append("project_code", "trade");
  myHeaders.append("filial_id", "2632143");

  var raw = JSON.stringify({
    order: [
      {
        filial_code: "170077",
        external_id: null,
        deal_id: "",
        subfilial_code: null,
        deal_time,
        delivery_number: null,
        delivery_date: created_date,
        booked_date: created_date,
        total_amount: total,
        room_id: "40622",
        room_code: "70777",
        room_name: "Website&Bot",
        robot_code: "967777070",
        lap_code: null,
        sales_manager_id: "3125770",
        sales_manager_code: "967777070",
        sales_manager_name: "Website&Bot Website&Bot",
        expeditor_id: null,
        expeditor_code: null,
        expeditor_name: null,
        person_code: phone_number,
        person_name: client_name,
        person_local_code: null,
        person_latitude,
        person_longitude,
        person_tin: "306088179",
        currency_code: "860",
        owner_person_code: "913901001",
        manager_code: null,
        van_code: null,
        contract_code: null,
        contract_number: null,
        invoice_number: null,
        payment_type_code: "PYMT:1",
        visit_payment_type_code: null,
        note,
        status: "D",
        with_marking: "N",
        self_shipment,
        total_weight_netto: "0",
        total_weight_brutto: "0",
        total_litre: "0",
        order_products: order_products.map((data, index) => {
          return {
            external_id: null,
            product_unit_id: "",
            product_code: data.product_code,
            product_local_code: null,
            product_name: data.product_name,
            serial_number: null,
            expiry_date: null,
            order_quant: data.product_quant,
            sold_quant: data.product_quant,
            return_quant: "0",
            inventory_kind: "G",
            on_balance: "Y",
            card_code: null,
            warehouse_code: "123",
            product_price: data.product_price,
            margin_amount: "0",
            margin_value: "0",
            margin_kind: "P",
            vat_amount: "4928.571429",
            vat_percent: "12",
            sold_amount: data.product_price,
            price_type_code: "123",
          };
        }),

        order_gifts: [],
        order_actions: [],
        order_consignments: [],
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
