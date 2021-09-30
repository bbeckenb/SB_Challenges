const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const User = require("../models/user")
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureLoggedIn, ensureCorrectUser, authenticateJWT } = require("../middleware/auth");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

 router.get('/', (req, res, next) => {
    res.send("APP IS WORKING!!!")
  })
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          throw new ExpressError("Username and password required, BUB!", 400);
        }
        const authUser = await User.authenticate(username, password);
        if (!authUser) {
            throw new ExpressError("You're not authorized, BUB!", 400);
        }
        User.updateLoginTimestamp(username);
        const token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ message: `Logged in ${username}!`, token })
    } catch (e) {
        next(e)
    }
    
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, first_name, last_name, phone } = req.body;
        if (!username || !password || !first_name || !last_name || !phone) {
            throw new ExpressError("Username, password, first name, last name, and phone req'ed man!", 400);
        }
        //hash this pw
        await User.register(req.body);
        const token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ message: `Registered ${username}!`, token })
    } catch (e) {
        if (e.code === '23505') {
            return next(new ExpressError("Username taken. Please pick another!", 400));
        }
        next(e)
    }
})

module.exports = router;
