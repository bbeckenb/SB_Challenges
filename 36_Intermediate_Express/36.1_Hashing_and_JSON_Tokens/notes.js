/**
 * Node Bcrypt
 * npm install bcrypt
 * bcrypt.hash() returns a promise, node.js is asynchronous
 * bcrypt.hash("pw", 12).then(d => console.log(d))
 * we will 'await' the async function
 * 
 * bcrypt.compare() gives us authentication
 * 
 * Authentication
    * JWT's (JSON web tokens), multiple apps can authenticate you rather than a single session like what we did in Flask
    * Secret code that multiple apps will be using to authenticate users
    * Three parts: 
      * Header: metadata about token - signing algorithm used & type of token
      * Payload: data to be stored in token (JSON object, user id, last sign in date, permissions, etc.)
      * Signature: header and payload being cryptographically signed by a hashing function, verifies its origins (like a wax stamp)
      * npm i jsonwebtoken
      * https://jwt.io/ to mess around with JWT architecture
      * const jwt = require('jsonwebtoken')
      * const myToken = jwt.sign({username: "todd"}, 'dsihdsdhsdhiuhdw3333')
      * jwt.decode(token) -> returns the payload from the token (works w/out secret key. Tokens are signed not enciphered)
      * jwt.verify(token, secret-key) -> verify token signature and return payload is valid, if not raise error!
      * 
*/