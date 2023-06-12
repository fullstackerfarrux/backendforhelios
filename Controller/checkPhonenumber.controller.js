import client from "../db/config.js";

const checkNumber = async (req, res) => {
  let { phone_number } = req.body;

  let check = await client.query("SELECT * from allusers");

  console.log(check.rows);

  let rescheck = true;

  for (let i = 0; i < check.rows.length; i++) {
    if (check.rows[i].phone_number == phone_number) {
      rescheck = false;
    }
  }

  if (rescheck == false) {
    let find = await client.query(
      "SELECT * FROM allusers WHERE phone_number = $1",
      [phone_number]
    );

    console.log(find.rows);
    res.status(400).send({
      code: "USER_EXISTS",
      message: "Phone number already exists!",
      user_name: find.rows[0].user_name,
      user_surname: find.rows[0].user_surname,
    });
  } else {
    res.status(200).send({ message: "User is not exist!", code: "NOT_FOUND" });
  }
};

export default checkNumber;
