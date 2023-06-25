const updateOrder = async (req, res) => {
  let {
    deal_id,
    deal_time,
    created_date,
    total,
    phone_number,
    client_name,
    note,
    order_status,
    order_products,
  } = req.body;
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
        deal_id,
        subfilial_code: null,
        deal_time,
        delivery_number: null,
        delivery_date,
        booked_date: delivery_date,
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
        person_id,
        person_code: phone_number,
        person_name: person_name,
        person_local_code: null,
        person_latitude: null,
        person_longitude: null,
        person_tin: "301688360",
        currency_code: "860",
        owner_person_code: "913901001",
        manager_code: null,
        van_code: null,
        contract_code: null,
        contract_number: null,
        invoice_number: null,
        payment_type_code: payment_type,
        visit_payment_type_code: null,
        note: comment,
        status: order_status,
        with_marking: "N",
        self_shipment: "Y",
        total_weight_netto: "0",
        total_weight_brutto: "0",
        total_litre: "0",
        order_products: [
          {
            external_id: null,
            product_unit_id: "163278849",
            product_code: "87114",
            product_local_code: null,
            product_name:
              "3741-1139020     Электробензонасос погружной в сборе / PEKAR / Россия",
            serial_number: null,
            expiry_date: null,
            order_quant: "1",
            sold_quant: "1",
            return_quant: "0",
            inventory_kind: "G",
            on_balance: "Y",
            card_code: null,
            warehouse_code: "123",
            product_price: "280000",
            margin_amount: "0",
            margin_value: "0",
            margin_kind: "P",
            vat_amount: "30000",
            vat_percent: "12",
            sold_amount: "280000",
            price_type_code: "123",
          },
        ],
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

export default updateOrder;
