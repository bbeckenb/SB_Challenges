const ExpressError = require("./expressError");


// MIDDLEWARE LOGGER EXAMPLE
function logger(req, res, next) {
    console.log(`Sending ${req.method} request to ${req.path}.`)
    return next();
} 


function checkForPassword(req, res, next) {
    try {
        if (req.query.password !== 'blorp') {
            throw new ExpressError("Missing passowrs", 402);
        } else {
            return next()
        } 
    } catch (e) {
        // if you pass something into next, it will ALWAYS be treated as an error
        return next(e)
    }
}
module.exports = { logger, checkForPassword }