/** Database setup for BizTime. */
// create 'client' from pg
const { Client } = require("pg");
// variable to contain our postgres db destination
let DB_URI;

// If we're running in test "mode", use our test db
// Make sure to create both databases!
if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///biztime_test";
} else {
  DB_URI = "postgresql:///biztime";
}

//creates db object instance 
let db = new Client({
  connectionString: DB_URI
});

// establishes connection using object method
db.connect();

// exports connected object to be used elsewhere in project
module.exports = db;
