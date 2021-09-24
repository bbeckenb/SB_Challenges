const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM invoices`);
        return res.json({invoices: results.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
        if (results.rows.length === 0) {
            throw new ExpressError(`No invoice with id number of ${id} found`, 404)
        }
        return res.send({ invoice: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {comp_code, amt} = req.body;
        const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, [comp_code, amt]);
        return res.status(201).json({ invoice: results.rows[0] })
    } catch (e) {
        next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amt, paid } = req.body;
        if (amt === undefined || paid === undefined) {
                throw new ExpressError(`Must include amt and paid`, 404)
            }
        let parameters;
        if (paid === true) {
            const jsToSqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            parameters = [amt, paid, jsToSqlDate, id]
        } else {
            parameters = [amt, paid, null, id]
        } 
        const results = await db.query(`UPDATE invoices SET amt=$1, paid=$2, paid_date=$3 WHERE id=$4 RETURNING id, comp_code, amt, paid, add_date, paid_date`, parameters)
        if (results.rows.length === 0) {
            throw new ExpressError(`No invoice with id number of ${id} found`, 404)
        }
        return res.send({ invoice: results.rows[0] })
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't delete invoice with id of ${id}`, 404);
        }
        const deleteInvoice = await db.query(`DELETE FROM invoices WHERE id=$1`, [id]);
        return res.send({ msg: `Deleted invoice with id ${id}` })
    } catch (e) {
        return next(e);
    }
})

module.exports = router;