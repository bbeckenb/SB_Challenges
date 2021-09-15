const express = require('express');
const ExpressError = require('./expressError')
// external middleware morgan
const morgan = require('morgan')
// CONNECTS OTHER ROUTE FILE
const shopRoutes = require('./routes/items')
// Init app instance w/ express class
const app = express();
// this tells the express framework what type of data to expect
app.use(express.json());
// external middleware
app.use(morgan('dev'))
// another configuration for expected data to express (if form data, parse as form data)
app.use(express.urlencoded({ extended: true}));
// CONNECTS OTHER ROUTE FILE
app.use('/items', shopRoutes)

app.get('/dogs', (req, res) => {
    console.log('YOU ASKED FOR /DOGS');
    return res.send('<h1>Swedish dog says bork bork</h1>')
})

app.get('/', (req, res) => {
    throw new ExpressError("homepage error, you shouldn't be here", 403)
    res.send('HOMEPAGE!')
})

// CAN SELECTIVELY USE MIDDLEWARE
// app.get('/secret', middleware.checkForPassword, (req, res, next) => {
//     return res.send("YOU ARE IN THE CHAMBER OF SECRENS")
// })

const USERS = [
    {username: "stacy", city:'reno'},
    {username: 'gladiator53', city:'miami'}
]

app.get('/users/:username', function(req, res, next) {
    try {
        const user = USERS.find(u => u.username === req.params.username);
        if(!user) throw new ExpressError("invalid username error, you shouldn't be here", 403)
        return res.send( {user} )
    } catch (e) {
        next(e)
    }
})

app.post('/register', (req, res) => {
    res.send(req.body);
})

// sometimes it is good to name your callback functions to indicate what is happening
// could also create this below and call it in the route method
app.get('/chickens', (req, res) => {
    res.send("BOCK BOCK BOCK (get request for /chickens11)")
})

app.post('/chickens', function createChickens(req, res) {
    res.send('YOU CREATED A CHICKEN (not rly, lol) (post req for /chickens)');
})

// query string data
app.get('/search', (req, res) => {
    const {term = 'piggies', sort = 'top'} = req.query;
    return res.send(`SEARCH PAGE! Term is : ${term}, sort is: ${sort}`)
})

const greetings = {
    en: "hello",
    fr: "bonjour",
    ic: "hallo",
    js: "konnichiwa"
}
// how to get data from url
app.get("/greet/:language", (req, res) => {
    const lang = req.params.language
    const greeting = greetings[lang]
    res.send(greeting);
})

// express goes to this if an input url does not match any routes
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

// express identifies this as the error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message
    return res.status(status).json({error: {message, status}})
})

module.exports = app; 
//  in server.js
// app.listen(3000, function() {
//     console.log('App on port 3000');
// })