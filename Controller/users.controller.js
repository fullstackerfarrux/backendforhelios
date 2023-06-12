import client from "../db/config.js";

const postUser = async (req, res) => {
  let { user_id, username, phone_number, users_location, user_language } =
    req.body;

  let check = true;

  let find = await client.query("SELECT * FROM allusers where user_id = $1", [
    user_id,
  ]);
};

export default postUser;
