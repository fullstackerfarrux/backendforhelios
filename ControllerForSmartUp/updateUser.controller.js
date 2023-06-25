const updateUser = async (req, res) => {
  let { person_name, email, address, phone_number, gender, address_guide } =
    req.body;

  console.log(email);
  console.log(gender);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );
  myHeaders.append("project_code", "trade");
  myHeaders.append("filial_id", "2632143");

  var raw = `{
      "legal_person": [{
          "name":            "${person_name}",
          "short_name":      "${person_name}",
          "code":            "${phone_number}",
          "is_budgetarian":  "Y",
          "state":           "A",
          "main_phone":      "+998${phone_number}",
          "is_client":       "Y",
          "email":           "${email}",
          "address":         "${address}",
          "address_guide":   "${address_guide}"
      }]
  }`;

  var raw = JSON.stringify({
    legal_person: [
      {
        name: person_name,
        short_name: person_name,
        code: phone_number,
        is_budgetarian: "Y",
        state: "A",
        main_phone: "+998" + phone_number,
        is_client: "Y",
        email,
        address: address,
        address_guide: address_guide,
      },
    ],
  });

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

export default updateUser;
