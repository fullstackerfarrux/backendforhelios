import client from "../db/config.js";

const createUser = async (req, res) => {
  let { phone_number, user_name, user_surname } = req.body;

  let create = await client.query(
    "INSERT INTO allusers(phone_number, user_name, user_surname) values($1, $2, $3)",
    [phone_number, user_name, user_surname]
  );

  if (create.command != "INSERT") {
    res.status(400).send({ msg: "Doesn't created" });
  } 

  res.status(200).send({ msg: "Created" });
};

export default createUser;
