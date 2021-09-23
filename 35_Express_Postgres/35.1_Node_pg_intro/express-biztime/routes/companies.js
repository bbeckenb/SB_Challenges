const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({companies: results.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const company = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if (company.rows.length === 0) {
            throw new ExpressError(`No company with code number of ${code} found`, 404)
        }
        const invoices = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [code]);
        const companyObjOut = company.rows[0];
        companyObjOut['invoices'] = invoices.rows;
        return res.send({ company: companyObjOut })
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
        return res.status(201).json({ company: results.rows[0] })
    } catch (e) {
        next(e)
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot update company with code of ${code}`, 404);
        }
        return res.send({ company: results.rows[0] })
    } catch (e) {
        next(e);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't delete company with code of ${code}`, 404);
        }
        const deleteCompany = await db.query(`DELETE FROM companies WHERE code=$1`, [code]);
        return res.send({ msg: `Deleted company with code ${code}` })
    } catch (e) {
        return next(e);
    }
})

module.exports = router;