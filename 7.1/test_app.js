/* .toEqual(obj)
Has the same value (eg, different lists with same values match)
.toBe(obj)
Is the same object (eg, different lists with same items don’t)
.toContain(obj)
Does object/array contain this item?
.not.
Add before matcher to invert (eg expect(...).not.toEqual(7))*/
describe('it should do stuff', function() {
    it('should do X', function() {
        expect(2+2).toEqual(4) 
    })
    it('should do Y', function() {
        expect(2+23).toEqual(25) 
    })
})

//submitForm(); pretends you submitted a form
//afterEach() afterAll() clean up code, clear values and stuff
//beforeEach() and beforeAll() run before each 'it' and all tests respectively

/*Unit Testing, narrow in scope test one unit at a time, 
integration testing tests a flow of multiple functions
Test every function at least one way
Think about edge cases
write code that is easier to test
More functions and smaller functions
Don't mix UI and logic in a function*/
