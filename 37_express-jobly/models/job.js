"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const duplicateCheck = await db.query(
          `SELECT title
           FROM jobs
           WHERE title = $1`,
        [title]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);

    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [
          title,
          salary,
          equity,
          companyHandle,
        ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
          `SELECT 
                  id, 
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           ORDER BY title`);
    return jobsRes.rows;
  }

   /** Find jobs that meet between 1 and all of 3 possible given filter criteria.
   * { titleLike, minSalary, hasEquity } => [{ id, title, salary, equity, companyHandle }, ...]
   * 
   * */
  static async findByCriteria({ titleLike, minSalary, hasEquity }) {
    // for each parameter, we adjust the searchConstraintString
    let searchConstraintString = '';
    if(titleLike !== undefined) {
      // if the title includes special chars, throw an error
      let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if(specialChars.test(titleLike)) {
        throw new ExpressError(`Parameter 'title': ${titleLike} cannot contain special characters`, 400);

      }
      searchConstraintString = `title LIKE '%${titleLike}%'`;
    }
    if(minSalary !== undefined) {
      // if the parameter is not an integer, throw an error
      if(minSalary < 0 || isNaN(minSalary) || !Number.isInteger(parseFloat(minSalary))) {
        throw new ExpressError(`Parameter 'minSalary': ${minSalary} must be a positive integer`, 400);
      }
      //if this is the second search filter, we add an AND
      if(searchConstraintString !== '') {
        searchConstraintString += ' AND ';
      }
      searchConstraintString += `salary>=${minSalary}`;
    }
    if(hasEquity !== undefined) {
      if(hasEquity !== 'true' && hasEquity !== 'false') {
        throw new ExpressError(`Parameter 'hasEquity': ${hasEquity} ${typeof(hasEquity)} must be 'true' or 'false'`, 400);
      }
      if(searchConstraintString !== '') {
        searchConstraintString += ' AND ';
      }
      if(hasEquity === 'true') {
        searchConstraintString += 'equity>0';
      } else {
        searchConstraintString += 'equity=0';
      }
        
    }
    const jobsRes = await db.query(
          `SELECT 
                  id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE ${searchConstraintString}
           ORDER BY title`);
    return jobsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle }
   *   where jobs is [{ id, title, salary, equity, jobHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
          `SELECT 
                  id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,
        [id]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, jobHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(idToChange, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity, 
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, idToChange]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${idToChange}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id, title, company_handle AS "companyHandle"`,
        [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}


module.exports = Job;
