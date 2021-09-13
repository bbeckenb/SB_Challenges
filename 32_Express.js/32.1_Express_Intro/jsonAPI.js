const express = require('express');

const app = express();

app.use(express.json());

const CANDIES = [
    {name: 'snickers', qty: 43, price: 1.59 },
    {name: 'skittles', qty: 20, price: 400 }
]

app.get('/candies', (req, res) => {
    res.json(CANDIES)
})

app.post('/candies', (req, res) => {
    if (req.body.name.toLowerCase() === "circus peanuts") {
        res.status(403).json({msg: "V BAD CHOICE. CIRCUS PEANUTS FORBIDDEN!"})
    }
    CANDIES.push(req.body)
    res.json(CANDIES)
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})