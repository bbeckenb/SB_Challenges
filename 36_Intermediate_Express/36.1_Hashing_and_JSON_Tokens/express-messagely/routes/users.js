const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const User = require("../models/user")
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureLoggedIn, ensureCorrectUser, authenticateJWT } = require("../middleware/auth");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', ensureLoggedIn, async (req, res, next) => {
    try {
        const users = await User.all();
        return res.json(users)
    } catch (e) {
        next(e)
    }   
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try {
        const users = await User.get(req.params.username);
        return res.json(users)
    } catch (e) {
        next(e)
    }   
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try {
        const messagesTo = await User.messagesTo(req.params.username);
        return res.json(messagesTo)
    } catch (e) {
        next(e)
    }   
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get('/:username/from', ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try {
        const messagesTo = await User.messagesFrom(req.params.username);
        return res.json(messagesTo)
    } catch (e) {
        next(e)
    }   
})

 module.exports = router;