const createOrder = async (req, res) => {
  let { total, phone_number, name } = req.body;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );

  var raw = `{
    "order": [{
        "deal_id": "123",
        "deal_time": "17.05.2023 10:09:00",
        "total_amount": "${total}",
        "email": "${email}",
        "person_id": "456",
        "person_code": "${phone_number}",
        "person_name": "${name}",
        "order_products": [{}]
    }]
}`;
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
};

export default createOrder;
