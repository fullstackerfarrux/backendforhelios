import pkg from "pg";

const { Pool } = pkg;

const client = new Pool({
  user: "postgres",
  database: "botkaizengroup",
  port: 5432,
  host: "localhost",
  password: "2006",
});

client.connect();

export default client;


// import pkg from "pg";

// const { Pool } = pkg;

// const client = new Pool({
//   password: "farrux77",
//   user: "postgres",
//   database: "botkaizengroup",
//   port: 5432,
//   host: "database-1.cwbuxpebpnbx.eu-north-1.rds.amazonaws.com",
// });


// client.connect();

// export default client;

