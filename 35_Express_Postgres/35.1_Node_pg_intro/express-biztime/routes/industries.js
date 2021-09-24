const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        let industries = await db.query(`SELECT * FROM industries`);
        industries = industries.rows;
        for (let row of industries) {
            const companies = await db.query(`SELECT comp_code FROM companies_industries 
                                            WHERE ind_code = $1`, [row.code]);
            let companyArr = [];
            for (let nested_row of companies.rows) {
                companyArr.push(nested_row['comp_code'])
            }
            row['comp_codes'] = companyArr;
        }
        return res.json({industries: industries})
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { code, name } = req.body;
        const results = await db.query(`INSERT INTO industries (code, name) VALUES ($1, $2) RETURNING code, name`, [code, name]);
        return res.status(201).json({ industry: results.rows[0] })
    } catch (e) {
        next(e)
    }
})

router.post('/tag', async (req, res, next) => {
    try {
        const { comp_code, ind_code } = req.body;
        const results = await db.query(`INSERT INTO companies_industries (comp_code, ind_code) VALUES ($1, $2) RETURNING comp_code, ind_code`, [comp_code, ind_code]);
        return res.status(201).json({ company_industry: results.rows[0] })
    } catch (e) {
        next(e)
    }
})

// router.put('/:code', async (req, res, next) => {
//     try {
//         const { code } = req.params;
//         const { name, description } = req.body;
//         const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code]);
//         if (results.rows.length === 0) {
//             throw new ExpressError(`Cannot update company with code of ${code}`, 404);
//         }
//         return res.send({ company: results.rows[0] })
//     } catch (e) {
//         next(e);
//     }
// })

// router.delete('/:code', async (req, res, next) => {
//     try {
//         const { code } = req.params;
//         const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
//         if (results.rows.length === 0) {
//             throw new ExpressError(`Can't delete company with code of ${code}`, 404);
//         }
//         const deleteCompany = await db.query(`DELETE FROM companies WHERE code=$1`, [code]);
//         return res.send({ msg: `Deleted company with code ${code}` })
//     } catch (e) {
//         return next(e);
//     }
// })

module.exports = router;