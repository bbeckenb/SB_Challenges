const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const Message = require("../models/message")
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureLoggedIn, ensureCorrectUser, authenticateJWT } = require("../middleware/auth");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        const msg = await Message.get(req.params.id);
        if (req.user.username !== msg.from_user.username && req.user.username !== msg.to_user.username) {
            throw new ExpressError("Unauthorized", 401);
        }
        return res.json(msg)
    } catch (e) {
        next(e)
    }   
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/',ensureLoggedIn, async (req, res, next) => {
    try {
        if (req.user.username !== req.body.from_username) {
            throw new ExpressError("Unauthorized", 401);
        }
        const msg = await Message.create(req.body);
        return res.json(msg)
    } catch (e) {
        next(e)
    }   
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
 router.post('/:id/read', async (req, res, next) => {
    try {
        let check = Message.get(req.params.id);
        if (req.user.username !== check.to_user.username) {
            throw new ExpressError("Unauthorized", 401);
        }
        const msg = await Message.markRead(req.params.id);
        return res.json(msg)
    } catch (e) {
        next(e)
    }   
})

 module.exports = router;