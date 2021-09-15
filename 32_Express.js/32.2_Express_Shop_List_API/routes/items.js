
const express = require('express');
const router = new express.Router();
const ExpressError = require("../expressError")
const items = require('../fakeDb')


router.get('/', (req, res) => {
    res.json({items})
})

router.post('/', (req, res, next) => {
    try {
        const { name='err', price='err' } = req.body;
        if (name === 'err' || price === 'err') throw new ExpressError('name and price required', 400);
        const newItem = {name:name, price:price};
        items.push(newItem)
        res.status(201).json({added:newItem})
    } catch (e) {
        return next(e)
    }
})

router.get('/:name', (req, res, next) => {
    try {
        const requestedItem = items.find(item => item.name === req.params.name);
        if (requestedItem === undefined) throw new ExpressError("item no exist", 404);
        res.json(requestedItem)
    } catch(e) {
        next(e)
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        const itemToUpdate = items.find(item => item.name === req.params.name);
        if (itemToUpdate === undefined) throw new ExpressError("item no exist", 404);
        const { name='err', price='err' } = req.body;
        if (name === 'err' || price === 'err') throw new ExpressError('name and price required', 400);
        itemToUpdate.name = name;
        itemToUpdate.price = price;
        res.status(201).json({updated:itemToUpdate})
    } catch(e) {
        next(e)
    }
})

router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
  })

module.exports = router;