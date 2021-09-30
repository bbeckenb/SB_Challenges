/** User class for message.ly */
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    //save this new user to the database
    const genSalt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const results = await db.query(`
      INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone])
   return results.rows[0] 
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const results = await db.query(`
    SELECT username, password
    FROM users
    WHERE username = $1`, [username]);
    const user = results.rows[0];
    if (user) {
      return await bcrypt.compare(password, user.password); 
    }
    return false
  }
  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    const results = await db.query(`
      UPDATE users
      SET last_login_at = current_timestamp
      WHERE username = $1`, [username]);
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(`
      SELECT username, first_name, last_name, phone 
      FROM users
    `)
    return results.rows
   }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const results = await db.query(`
      SELECT username, first_name, last_name, phone, last_login_at, join_at 
      FROM users
      WHERE username=$1`, [username]);
    if (!results.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404)
    }
    return results.rows[0]
   }


  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const results = await db.query(`
      SELECT m.id, m.to_username, m.body, m.sent_at, m.read_at,
      f.username, f.first_name, f.last_name, f.phone 
      FROM messages AS m
      JOIN users AS f ON m.to_username = f.username
      WHERE m.from_username=$1`, [username]);
        const arrOut = [];
        for (let row of results.rows) {
          arrOut.push({id:row.id,
                       body:row.body,
                       sent_at:row.sent_at,
                       read_at:row.read_at, 
                       to_user:{username:row.to_username, 
                                first_name:row.first_name, 
                                last_name:row.last_name, 
                                phone:row.phone}
          })
        }
    return arrOut
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const results = await db.query(`
      SELECT m.id, m.from_username, m.body, m.sent_at, m.read_at,
      f.username, f.first_name, f.last_name, f.phone 
      FROM messages AS m
      JOIN users AS f ON m.from_username = f.username
      WHERE m.to_username=$1`, [username]);
        const arrOut = [];
        for (let row of results.rows) {
          arrOut.push({id:row.id,
                       body:row.body,
                       sent_at:row.sent_at,
                       read_at:row.read_at, 
                       from_user:{username:row.from_username, 
                                first_name:row.first_name, 
                                last_name:row.last_name, 
                                phone:row.phone}
          })
        }
    return arrOut
  }
}

module.exports = User;

