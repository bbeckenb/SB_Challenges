/** Database setup for BizTime. */
// create 'client' from pg
const { Client } = require("pg");

let DB_URI;

// If we're running in test "mode", use our test db
// Make sure to create both databases!
if (process.env.NODE_ENV === "test") {
  DB_URI = //"postgresql:///NAME_OF_DB_TEST";
} else {
  DB_URI = //"postgresql:///NAME_OF_DB";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
