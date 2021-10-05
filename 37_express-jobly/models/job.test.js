"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const Job = require("./job.js")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "new",
    salary: 1,
    equity: 0.5,
    companyHandle: "c2",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual({
        id: expect.any(Number),
        title: "new",
        salary: 1,
        equity: "0.5",
        companyHandle: "c2"
      });

    const result = await db.query(
          `SELECT *
           FROM jobs
           WHERE company_handle = 'c2'`);
    expect(result.rows).toEqual([
      {
        id: expect.any(Number),
        title: "new",
        salary: 1,
        equity: "0.5",
        company_handle: "c2"
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title:"j1", 
        salary:10, 
        equity:"0", 
        companyHandle:"c1"
      },
      {
        id: expect.any(Number),
        title:"j2", 
        salary:20, 
        equity:"0.5", 
        companyHandle:"c1"
      }
    ]);
  });
});

// /************************************** findAll */

describe("findByCriteria", function () {
  test("works: titleLike", async function () {
    let data = { 
      titleLike: '1'
    }
    let jobs = await Job.findByCriteria(data);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title:"j1", 
        salary:10, 
        equity:"0", 
        companyHandle:"c1"
      }
    ]);
  });

  test("works: minSalary", async function () {
    let data = { 
      minSalary: 15
    }
  let jobs = await Job.findByCriteria(data);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title:"j2", 
        salary:20, 
        equity:"0.5", 
        companyHandle:"c1"
      }
    ]);
  });

  test("works: hasEquity true", async function () {
    let data = { 
      hasEquity: 'true'
    }
  let jobs = await Job.findByCriteria(data);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title:"j2", 
        salary:20, 
        equity:"0.5", 
        companyHandle:"c1"
      }
    ]);
  });

  test("works: hasEquity false", async function () {
    let data = { 
      hasEquity: 'false'
    }
  let jobs = await Job.findByCriteria(data);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title:"j1", 
        salary:10, 
        equity:"0", 
        companyHandle:"c1"
      }
    ]);
  });

  test("works: combo", async function () {
    let data = { 
      titleLike: 'j2',
      minSalary: 22,
      hasEquity: 'false'
    }
    let companies = await Job.findByCriteria(data);
    expect(companies).toEqual([]);
  });

  test("works: combo part 2", async function () {
    let data = { 
      titleLike: 'j2',
      minSalary: 19,
      hasEquity: 'true'
    }
    let companies = await Job.findByCriteria(data);
    expect(companies).toEqual([
      {
        id: expect.any(Number),
        title:"j2", 
        salary:20, 
        equity:"0.5", 
        companyHandle:"c1"
      }
    ]);
  });

  test("titleLike: special char error", async function () {
    try {
      let data = { 
        titleLike: '/',
        minSalary: 0,
        hasEquity: .1
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

  test("minSalary: NaN error", async function () {
    try {
      let data = { 
        titleLike: 'a',
        minSalary: 'a',
        hasEquity: .5
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

  test("minSalary filters: decimal error", async function () {
    try {
      let data = { 
        titleLike: 'a',
        minSalary: 2.2,
        hasEquity: .5
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

  test("minSalary filters: negative num error", async function () {
    try {
      let data = { 
        titleLike: 'a',
        minSalary: -2,
        hasEquity: .5
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

  test("hasEquity filters: > 1 error", async function () {
    try {
      let data = { 
        titleLike: 'a',
        minSalary: 2,
        hasEquity: 1.5
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

  test("hasEquity filters: <1 error", async function () {
    try {
      let data = { 
        titleLike: 'a',
        minSalary: 2,
        hasEquity: -.3
      }
      await Job.findByCriteria(data);
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });
});

// /************************************** get */

describe("get", function () {
  test("works", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    let job = await Job.get(results.rows[0].id);
    expect(job).toEqual({
        id: results.rows[0].id,
        title:"j1", 
        salary:10, 
        equity:"0", 
        companyHandle:"c1"
    });
  });

  test("not found if no such company", async function () {
    try {
      await Job.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// /************************************** update */

describe("update", function () {
  const updateData = {
    title:"j3", 
    salary:15,
    equity:0.7
  };

  test("works", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    let job = await Job.update(results.rows[0].id, updateData);
    expect(job).toEqual( {
        id: expect.any(Number),
        title: 'j3',
        salary: 15,
        equity: '0.7',
        companyHandle: 'c1'
      });

    const result = await db.query(
          `SELECT *
           FROM jobs
           WHERE id = ${results.rows[0].id}`);
    expect(result.rows).toEqual([{
        id: expect.any(Number),
        title: 'j3',
        equity: '0.7',
        salary: 15,
        company_handle: 'c1'
      }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
        title:"j3", 
        salary:null,
        equity:null
      };

    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    let job = await Job.update(results.rows[0].id, updateDataSetNulls);
    expect(job).toEqual( {
        id: expect.any(Number),
        title: 'j3',
        salary: null,
        equity: null,
        companyHandle: 'c1'
      });

    const result = await db.query(
        `SELECT *
         FROM jobs
         WHERE id = ${results.rows[0].id}`);
    expect(result.rows).toEqual([{
        id: expect.any(Number),
        title: 'j3',
        equity: null,
        salary: null,
        company_handle: 'c1'
        }]);
    });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
      await Job.update(results.rows[0].id, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** remove */

describe("remove", function () {
  test("works", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    await Job.remove(results.rows[0].id);
    const res = await db.query(
        `SELECT id FROM jobs WHERE id=${results.rows[0].id}`);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
