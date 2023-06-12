import client from "../db/config.js";

const postUser = async (req, res) => {
  let { user_id, username, phone_number, users_location, user_language } =
    req.body;

  let check = true;

  let find = await client.query("SELECT * FROM allusers where user_id = $1", [
    user_id,
  ]);

console.log(find);

  // for (let i = 0; i < find.rows.length; i++) {
  //   if (find.rows[i].username == username) {
  //     check = false;
  //   }
  // }



  // if (!find.rows.length) {
  //   let create = await client.query(
  //     "INSERT INTO allusers(user_id, tg_username, phone_number, users_location, user_language) values($1, $2, $3, $4, $5)",
  //     [user_id, username, phone_number, users_location, user_language]
  //   );

  //   res.status(200).send({ msg: "created" });
  // } else {
  //   let update = await client.query(
  //     "UPDATE allusers SET users_location = $1 where user_id = $2",
  //     [users_location, user_id]
  //   );

  //   res.status(200).send({ msg: "updated" });
  // }
};

export default postUser;
