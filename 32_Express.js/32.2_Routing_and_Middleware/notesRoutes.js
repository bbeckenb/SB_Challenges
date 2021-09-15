/**
 * Routers help us store routes in different files for better organization
 *  these are the blueprint for setting up routes in a separate file
 * const express = require('express');
    const router = new express.router();

    router.get('/')

    module.exports = router;

    * WHAT IS MIDDLEWARE?
        * It is code that runs in the middle of the request/ response cycle
        * In express, middleware are functions that get access to the req and res objects and can also call the 'next' function
    * WHAT CAN WE DO WITH IT
        * reduce duplication
        * log data about each request  
        * keep a user in a session with authentication (like with g in Flask)
    * WHAT DOES IT LOOK LIKE?
        * In another file called middleware.js - example below
        * function logger(req, res, next) {
        *   console.log(`Sending ${req.method} request to ${req.path}.`)
        *   return next();} 
        * 
        * Has arguments (req, res, next)
        * returns 'next()'
        * Placement is very important, it must sit above our routes
    * CAN ALSO USE EXTERNAL MIDDLEWARE
        * Will use morgan (must npm install morgan)  
        * 
    * SUPER TEST
        * Install with npm i --save-dev supertest
        * --save-dev command makes package.json separate the package for developer interests (as opposed to just an executable run)

 */

const express = require('express');
const router = new express.Router();

const NOTES = [{id:1, note: "this is a note!"}, 
                {id:2, note: "HEY that's MY notebook!!!"}]
router.get('/', (req, res) => {
    res.json({notes: NOTES})
})

router.get('/:id', (req, res) => {
    const note = NOTES.find(u => u.id === +req.params.id) //+ turns string into number
    res.json({note})
})

module.exports = router;