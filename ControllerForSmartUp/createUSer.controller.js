const createUSer = async (req, res) => {
  let { first_name, phone_number, email } = req.body;
  console.log(req.body);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );

  var raw = `{
    "legal_person": [{
        "name": "${first_name}",
        "short_name": "${first_name}",
        "code": "${phone_number}",
        "email": "${email}",
        "gender":" M",
        "is_budgetarian": "Y",
        "state": "A"
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

export default createUSer;
