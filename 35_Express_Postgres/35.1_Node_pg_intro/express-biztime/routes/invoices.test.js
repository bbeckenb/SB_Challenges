// Tell Node that we're in test "mode"
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Full CRUD test examples
let testCompany;
let testInvoice
beforeEach(async () => {
  const company = await db.query(`INSERT INTO companies (code, name, description) VALUES ('FIS', 'Fish In Shorts', 'name says it all') RETURNING  code, name, description`);
  testCompany = company.rows[0]
  const invoice = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ('FIS', 49.99) RETURNING *`);
  testInvoice = invoice.rows[0]
  testInvoice['add_date'] = testInvoice['add_date'].toJSON();
})

afterEach(async () => {
  await db.query(`DELETE FROM companies`)
  await db.query(`DELETE FROM invoices`)
//   invoices delete on cascade
})

afterAll(async () => {
  // need this command to cease connection to the database
  await db.end()
})

describe("GET /invoices", () => {
    test("get a list with the invoices in db", async () => {
        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({invoices:[testInvoice]});
    })
})

describe("GET /invoices/:id", () => {
    test("get a list with the invoices in db", async () => {
        const res = await request(app).get(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({invoice:testInvoice});
    })
    test("Responds with 404 for invalid id", async () => {
        const res = await request(app).get('/invoices/0');
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /invoices", () => {
    test("Create new invoice", async () => {
        const res = await request(app).post('/invoices').send({ comp_code: `${testCompany.code}`, amt: 45.11});
        const invoice1 = await db.query(`SELECT * FROM invoices WHERE amt=45.11`);
        testInvoice1 = invoice1.rows[0]
        testInvoice1['add_date'] = testInvoice1['add_date'].toJSON();
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({invoice: testInvoice1})
    })
})

describe("PUT /invoices", () => {
    test("Update invoice name/ description", async () => {
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send({comp_code:`${testInvoice.comp_code}`, amt: 45.12});
        const invoice1 = await db.query(`SELECT * FROM invoices WHERE amt=45.12`);
        testInvoice1 = invoice1.rows[0]
        testInvoice1['add_date'] = testInvoice1['add_date'].toJSON();
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({invoice: testInvoice1});
    })
    test("Update invoice name/ description", async () => {
        const res = await request(app).put(`/invoices/0`).send({comp_code: `${testCompany.code}`, amt: 45.11});
        expect(res.statusCode).toBe(404)
    })
})

describe("DELETE /invoices/:code", () => {
  test("Deletes a single invoice", async () => {
    const holdCode = testInvoice.id
    const res = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: `Deleted invoice with id ${holdCode}` })
  })
})
