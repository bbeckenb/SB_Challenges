/*
 * npm i --global jest (to install) 

ORGANIZING TESTS:
    -Test files should be named NAME_OF_FILE.test.js
    -you can place files in the same directory as the JS file it tests
    -OR you can organize all tests into a folder called __tests__
    -If you have a package.json you don't need additional configuration
        -if not, create a jest.config.js file. It can be empty, you just need one
    -Run all tests using the command jest
        -you can run an individual test using 'jest NAME_OF_FILE'
    -group tests with describe

EXPECTATIONS:
    -toBe() 'equality of reference'
    -toEqual() 'equality of value'
    -toContain()
    -toBeGreaterThan()
    -toHaveLength()
    -can use .not() to invert something
    -etc.
    -look at docs

BEFORE/ AFTER
    -beforeEach()
        -equivalent of set_up in python
        -scope your variables appropriately
    -afterEach()
        -equivalent of tear_down in python
    -beforeAll() and afterAll() before all tests and at the very end after tests have all run
 */