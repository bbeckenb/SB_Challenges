const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

process.env.NODE_ENV = 'test'

describe("Test Book Routes", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    let b = await Book.create({
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Metthew Line",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games", 
          year: 2017
      });
  });

  describe("POST /books", function () {
    test("can create book", async function () {
      let response = await request(app)
        .post("/books")
        .send({
            isbn: "0691161519",
            amazon_url: "http://a.co/eobPtX3",
            author: "Metthew Lines",
            language: "englishes",
            pages: 2644,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games and Friends", 
              year: 2019
          });
    expect(response.statusCode).toEqual(201);
      let book = response.body.book;
      expect(book.isbn).toEqual("0691161519");
    });
    test("can form validator works for book", async function () {
      let response = await request(app)
        .post("/books")
        .send({
            isbn: 691161519,
            amazon_url: "http://a.co/eobPtX3",
            author: "Metthew Lines",
            language: "englishes",
            pages: 2644,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games and Friends", 
              year: 2019
          });
    expect(response.statusCode).toEqual(400);
      let error = response.body.error.message;
      expect(error).toEqual(["instance.isbn is not of a type(s) string"]);
    });
  });

  describe("PUT /books", function () {
    test("can update book", async function () {
      let response = await request(app)
        .put("/books/0691161518")
        .send({
            isbn: "0691161518",
            amazon_url: "http://a.co/eobPtX44",
            author: "Mew Mewfer",
            language: "englishesz",
            pages: 26444,
            publisher: "Princeton University Presss",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games and Friends", 
              year: 2019
          });
    expect(response.statusCode).toEqual(200);
      let book = response.body.book;
      expect(book.pages).toEqual(26444);
    });
    test("can form validator works for book", async function () {
      let response = await request(app)
        .put("/books/0691161519")
        .send({
            isbn: 691161519,
            amazon_url: "http://a.co/eobPtX3",
            author: "Metthew Lines",
            language: "englishes",
            pages: 2644,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games and Friends", 
              year: 2019
          });
    expect(response.statusCode).toEqual(400);
      let error = response.body.error.message;
      expect(error).toEqual(["instance.isbn is not of a type(s) string"]);
    });
  });

});

afterAll(async function () {
  await db.end();
});
