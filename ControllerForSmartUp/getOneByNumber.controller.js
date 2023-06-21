const getOneByNumber = async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append(
    "Authorization",
    "Basic YWRtaW5Aa2FpemVuZ3JvdXA6Z3JlZW53aGl0ZQ=="
  );

  var raw =
    '{\n   "code": "913901001",\n    "state": "",\n    "begin_created_on": "",\n    "end_created_on": "",\n    "begin_modified_on": "",\n    "end_modified_on": ""\n}';

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
    .catch((error) => res.status(400).send(error));
};

export default getOneByNumber;
