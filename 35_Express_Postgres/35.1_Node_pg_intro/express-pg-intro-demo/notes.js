/*  GOALS
    * Use pg to connect and execute SQL queries 
    * Explain what SQL injection is and hwo to prevent it with pg
    * NODE SQL Ecosystem, use ORMs
        * Sequilize is good example of ORM
        * Query-builder is abstraction layer underneath ORM
        * Using pg sequel driver
    * USING PG
        * Connect to specific db   
        * Don't leave yourself open to user-injection! Bad actors will get you
        * Sanitize/ paramaterize queries
        * Represent variables in SQL using $1, $2
    * ERROR HANDLING
        * MUST use try and catch for asynchronous code so server does not crash  
*/