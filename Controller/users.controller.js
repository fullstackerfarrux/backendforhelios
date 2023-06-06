import client from "../db/config.js";

const postUser = async (req, res) => {
  let { user_id, username, phone_number, users_location, user_language } =
    req.body;

  let check = true;

  let find = await client.query("SELECT * FROM tgusers where user_id = $1", [
    user_id,
  ]);

  for (let i = 0; i < find.rows.length; i++) {
    if (find.rows[i].username == username) {
      check = false;
    }
  }

  console.log(!find.rows.length);

  if (!find.rows.length) {
    let create = await client.query(
      "INSERT INTO tgusers(user_id, username, phone_number, users_location, user_language) values($1, $2, $3, $4, $5)",
      [user_id, username, phone_number, users_location, user_language]
    );
  } else {
    let update = await client.query(
      "UPDATE tgusers SET users_location = $1 where user_id = $2",
      [users_location, user_id]
    );
  }
};

export default postUser;
