const createUSer = async (req, res) => {
  let { first_name, phone_number, email, tin } = req.body;

  console.log("changed");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );

  //   var raw = `{
  //     "legal_person": [{
  //         "name":            "${first_name}",
  //         "short_name":      "${first_name}",
  //         "code":            "${phone_number}",
  //         "email":           "${email}",
  //         "gender":          "M",
  //         "is_budgetarian":  "Y",
  //         "state":           "A",
  //         "main_phone":      "+998${phone_number}",
  //         "tin":             "${phone_number}"
  //     }]
  // }`;

  var raw = `{
   "legal_person": [
    {
      "name": "farrux7",
      "code": "913152006",
      "short_name": "farux",
      "region_code": "Tashkent",
      "is_budgetarian": "Y",
      "tin": "965234875",
      "state": "A",
      "primary_person_code": "",
      "parent_person_code": "",
      "barcode": "48465198",
      "vat_code": "566419465165",
      "cea": "",
      "main_phone": "+998913152006",
      "email": "farrux@gmail.com",
      "web": "",
      "address": "Tashkent, Beshagach 1",
      "address_guide": "",
      "zip_code": "32105",
      "latlng": "",
      "is_client": "",
      "is_supplier": "",
      "groups": [
        {
          "group_code": "",
          "type_code": ""
        }
      ],
       "bank_accounts": [
 {
          "bank_account_id": "",
          "bank_account_code": "",
          "bank_account_name": "",
          "is_main": "",
          "currency_code": "",
          "state": "",
          "note": "",
          "mfo": ""
        
 }
],
 "rooms": [
        {
          "room_code": ""
        }
      ]
    }
  ]
}
}`;
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  console.log(raw);
  fetch(
    "https://smartup.online/b/anor/mxsx/mr/legal_person$import",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let jsonRes = JSON.parse(result);
      res.status(200).send(jsonRes);
    })
    .catch((error) => res.status(400).send(error));
};

export default createUSer;
