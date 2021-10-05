"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db.query(
          `SELECT handle
           FROM companies
           WHERE handle = $1`,
        [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
          `INSERT INTO companies
           (handle, name, description, num_employees, logo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
        [
          handle,
          name,
          description,
          numEmployees,
          logoUrl,
        ],
    );
    const company = result.rows[0];

    return company;
  }

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll() {
    const companiesRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           ORDER BY name`);
    return companiesRes.rows;
  }

  /** Find companies that meet between 1 and all of 3 possible given filter criteria.
   * {nameLike, minEmployees, maxEmployees} => [{ handle, name, description, numEmployees, logoUrl }, ...]
   * 
   * */
  static async findByCriteria(reqParams) {
    let { nameLike, minEmployees, maxEmployees } = reqParams;
    // for each parameter, we adjust the searchConstraintString
    let searchConstraintString = '';
    if(nameLike !== undefined) {
      // if the nameLike includes special chars, throw an error
      let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if(specialChars.test(nameLike)) {
        throw new ExpressError(`Parameter 'nameLike': ${nameLike} cannot contain special characters`, 400);
      }
      searchConstraintString = `name LIKE '%${nameLike}%'`;
    }
    if(minEmployees !== undefined) {
      // if the parameter is not an integer, throw an error
      if(minEmployees < 0 || isNaN(minEmployees) || !Number.isInteger(parseFloat(minEmployees))) {
        throw new ExpressError(`Parameter 'minEmployees': ${minEmployees} must be a positive integer`, 400);
      }
      //if this is the second search filter, we add an AND
      if(searchConstraintString !== '') {
        searchConstraintString += ' AND ';
      }
      searchConstraintString += `num_employees>=${minEmployees}`;
    }
    if(maxEmployees !== undefined) {
      if(maxEmployees < 0 || isNaN(maxEmployees) || !Number.isInteger(parseFloat(maxEmployees))) {
        throw new ExpressError(`Parameter 'maxEmployees': ${maxEmployees} must be a positive integer`, 400);
      }
      if(minEmployees) {
        if(minEmployees >= maxEmployees) {
          throw new ExpressError(`Parameter 'minEmployees': ${minEmployees} cannot be greater than or equal to 'maxEmployees': ${maxEmployees}`, 400);
        }
      }
      if(searchConstraintString !== '') {
        searchConstraintString += ' AND ';
      }
      searchConstraintString += `num_employees<=${maxEmployees}`;
    }
    const companiesRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE ${searchConstraintString}
           ORDER BY name`);
    return companiesRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const companyRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
        [handle]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  static async getAssociatedJobs(handle) {
    const companyRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity
           FROM jobs
           WHERE company_handle = $1`,
        [handle]);

    const jobs = companyRes.rows;

    return jobs;
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
        [handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}


module.exports = Company;
