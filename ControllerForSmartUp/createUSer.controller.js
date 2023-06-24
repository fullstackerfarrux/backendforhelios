const createUser = async (req, res) => {
  let { first_name, phone_number, email } = req.body;

  console.log("changed");

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
          "name":            "${first_name}",
          "short_name":      "${first_name}",
          "code":            "${phone_number}",
          "email":           "${email}",
          "gender":          "M",
          "is_budgetarian":  "Y",
          "state":           "A",
          "main_phone":      "+998${phone_number}",
          "is_client":       "Y"
      }]
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

export default createUser;
