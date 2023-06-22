const getOneByNumber = async (req, res) => {
  let { phone_number } = req.body;

  console.log(req.body);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );

  var raw = `{  
                "code":              "${phone_number}",
                "state":             "",
                "begin_created_on":  "",
                "end_created_on":    "",
                "begin_modified_on": "",
                "end_modified_on":   ""
              }`;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://smartup.online/b/anor/mxsx/mr/legal_person$export",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let jsonRes = JSON.parse(result);
      res.status(200).send(jsonRes);
    })
    .catch((error) => res.status(400).send({ msg: "USER NOT_FOUND" }));
};

export default getOneByNumber;
