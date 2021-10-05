"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title:"j3", 
    salary:10, 
    equity:0, 
    companyHandle:"c1"
  };

  test("ok for users", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: 
      {id: expect.any(Number),
        title:"j3", 
        salary:10, 
        equity:"0", 
        companyHandle:"c1"
    }
    });
  });

  test("unauth non-admin", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          equity: .5,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
                title:"j3", 
                salary:10, 
                equity:"0", 
                companyHandle:"c1"
            
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs:
          [
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
          ],
    });
  });

  test("filter by title", async function () {
    const resp = await request(app).get(
      "/jobs?titleLike=j1");
    expect(resp.body).toEqual({
      jobs:
          [
            {   
                id: expect.any(Number),
                title:"j1", 
                salary:10, 
                equity:"0", 
                companyHandle:"c1"
            }
          ],
    });
    const resp1 = await request(app).get(
      "/jobs?titleLike=a");
    expect(resp1.body).toEqual({
      jobs: []
    });
  });

  test("if titleLike contains special chars, throw error 400", async function () {
    const resp = await request(app).get(
      "/jobs?titleLike=!");
    expect(resp.statusCode).toEqual(400);
  });

  test("filter by minSalary", async function () {
    const resp = await request(app).get(
      "/jobs?minSalary=11");
    expect(resp.body).toEqual({
      jobs:
          [
            {   
                id: expect.any(Number),
                title:"j2", 
                salary:20, 
                equity:"0.5", 
                companyHandle:"c1"
            }
          ],
    });
    const resp1 = await request(app).get(
        "/jobs?minSalary=21");
    expect(resp1.body).toEqual({
      jobs: []
    });
  });

  test("if minSalary <0, throw error 400", async function () {
    const resp = await request(app).get(
      "/jobs?minSalary=-21");
    expect(resp.statusCode).toEqual(400);
  });

  test("if minSalary NaN, throw error 400", async function () {
    const resp = await request(app).get(
      "/jobs?minSalary=a");
    expect(resp.statusCode).toEqual(400);
  });

  test("filter by hasEquity", async function () {
    const resp = await request(app).get(
      "/jobs?hasEquity=true");
    expect(resp.body).toEqual({
      jobs:
      [
        {   
            id: expect.any(Number),
            title:"j2", 
            salary:20, 
            equity:"0.5", 
            companyHandle:"c1"
        }
      ],
    });
    const resp1 = await request(app).get(
      "/jobs?hasEquity=false");
    expect(resp1.body).toEqual({
      jobs: 
      [
        {   
            id: expect.any(Number),
            title:"j1", 
            salary:10, 
            equity:"0", 
            companyHandle:"c1"
        }
      ]
    });
  });

  test("if hasEquity not t/f, throw error 400", async function () {
    const resp = await request(app).get(
      "/jobs?hasEquity=not");
    expect(resp.statusCode).toEqual(400);
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

// /************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app).get(`/jobs/${results.rows[0].id}`);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title:"j1", 
        salary:10, 
        equity:"0",
        companyHandle:"c1"
      }
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

// /************************************** PATCH /companies/:handle */

describe("PATCH /jobs/:id", function () {
  test("works for users", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .patch(`/jobs/${results.rows[0].id}`)
        .send({
          title: "j3",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
        job: {
            id: expect.any(Number),
            title:"j3", 
            salary:10, 
            equity:"0",
            companyHandle:"c1"
          }
    });
  });

  test("unauth for anon", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .patch(`/jobs/${results.rows[0].id}`)
        .send({
          name: "j3",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for non-admin", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .patch(`/jobs/${results.rows[0].id}`)
        .send({
          title: "j3",
        })
        .set("authorization", `Bearer ${u2Token}`);;
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
        .patch(`/jobs/0`)
        .send({
          title: "new nope",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on title change attempt", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .patch(`/jobs/${results.rows[0].id}`)
        .send({
          title: 999,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .patch(`/jobs/${results.rows[0].id}`)
        .send({
          larbldarbl: "barnana",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// /************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:handle", function () {
  test("works for users", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .delete(`/jobs/${results.rows[0].id}`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: `${results.rows[0].id}` });
  });

  test("unauth for anon", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .delete(`/jobs/${results.rows[0].id}`)
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for non-admin", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .delete(`/jobs/${results.rows[0].id}`)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such company", async function () {
    let results = await db.query(`SELECT id FROM jobs WHERE title='j1'`);
    const resp = await request(app)
        .delete(`/jobs/0`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
