process.env.NODE_ENV = "test";

// THIS IS THE FIRST THING WE NEED, this is supertest as 'request'
const request = require("supertest");

// NEED APP
const app = require("../app");
// NEED DATABASE CONNECTION
let items = require("../fakeDb");

// this will initialize with pickles in cats array
let testItem = {name: 'popsicle', price: 1.45};

beforeEach(function () {
  items.push(testItem);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`, this clears contents
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [testItem] })
  })
})

describe("POST new item to /items", () => {
    test("Post one item to list", async() => {
        const res = await request(app).post('/items').send({name:'popsicle', price: 1.45})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: 'popsicle', price: 1.45}});
     },
    test("Missing either or both of name and price sends back 400 status code", async() => {
        const res = await request(app).post('/items').send({price: 1.45})
        expect(res.statusCode).toBe(400);
    })
)})

describe("GET /items/:name to retrieve single item", () => {
    test("retrieve existing item", async() => {
        const res = await request(app).get(`/items/${testItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(testItem);
    }),
    test("item no exist, return 404", async() => {
        const res = await request(app).get(`/items/nameDNE`);
        expect(res.statusCode).toBe(404);
    })
})

describe("PATCH existing item to /items/:name", () => {
    test("Post one item to list", async() => {
        const res = await request(app).patch(`/items/${testItem.name}`).send({name:'freezie', price: 2.45})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({updated: {name:'freezie', price: 2.45}});
     },
    test("Missing either or both of name and price sends back 400 status code", async() => {
        const res = await request(app).patch(`/items/${testItem.name}`).send({price: 1.45})
        expect(res.statusCode).toBe(400);
    }),
    test("item no exist, return 404", async() => {
        const res = await request(app).patch(`/items/nameDNE`);
        expect(res.statusCode).toBe(404);
    })
)})
describe("/DELETE /items/:name", () => {
    test("Deleting a item", async () => {
      const res = await request(app).delete(`/items/${testItem.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid item", async () => {
      const res = await request(app).delete(`/items/cheez`);
      expect(res.statusCode).toBe(404);
    })
  })