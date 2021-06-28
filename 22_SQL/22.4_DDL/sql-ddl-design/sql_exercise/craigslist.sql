-- Craigslist
-- Design a schema for Craigslist! Your schema should keep track of the following

-- The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
-- Users and preferred region
-- Posts: contains title, text, the user who has posted, the location of the posting, 
-- the region of the posting
-- Categories that each post belongs to

DROP DATABASE IF EXISTS craigslist_db;

CREATE DATABASE craigslist_db;

\c craigslist_db;

CREATE TABLE regions
(
    id SERIAL PRIMARY KEY,
    state_name TEXT NOT NULL,
    city_name TEXT NOT NULL,
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    region REFERENCES regions(id)
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    catgory TEXT UNIQUE NOT NULL,
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    catgory INTEGER REFERENCES categories(id) NOT NULL,
    region INTEGER REFERENCES regions(id),
    views INTEGER DEFAULT 1,
    description VARCHAR(150) NOT NULL,
    picture VARBINARY(max),
    user INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
);