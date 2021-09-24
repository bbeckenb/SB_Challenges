// Tell Node that we're in test "mode"
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Full CRUD test examples
let testCompany;
beforeEach(async () => {
  const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ('FIS', 'Fish In Shorts', 'name says it all') RETURNING  code, name, description`);
  testCompany = result.rows[0]
})

afterEach(async () => {
  await db.query(`DELETE FROM companies`)
})

afterAll(async () => {
  // need this command to cease connection to the database
  await db.end()
})

describe("GET /companies", () => {
    test("get a list with the companies in db", async () => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies:[testCompany]});
    })
})

describe("GET /companies/:code", () => {
    test("get a list with the companies in db", async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        const companyObjOut = testCompany;
        companyObjOut['invoices'] = [];
        expect(res.body).toEqual({company:companyObjOut});
    })
    test("Responds with 404 for invalid id", async () => {
        const res = await request(app).get('/companies/notACode');
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /companies", () => {
    test("Create new company", async () => {
        const res = await request(app).post('/companies').send({ code: "woo", name: "wow ow owl", description: "WOO!"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company: { code: "woo", name: "wow ow owl", description: "WOO!"}})
    })
})

describe("PUT /companies", () => {
    test("Update company name/ description", async () => {
        const res = await request(app).put(`/companies/${testCompany.code}`).send({name: "wow ow owl", description: "WOO!"});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({company: { code: `${testCompany.code}`, name: "wow ow owl", description: "WOO!"}})
    })
    test("Update company name/ description", async () => {
        const res = await request(app).put(`/companies/notACode`).send({name: "wow ow owl", description: "WOO!"});
        expect(res.statusCode).toBe(404)
    })
})

describe("DELETE /companies/:code", () => {
  test("Deletes a single company", async () => {
    const holdCode = testCompany.code
    const res = await request(app).delete(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: `Deleted company with code ${holdCode}` })
  })
})
