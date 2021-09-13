const { MarkovMachine } = require("./markov");

describe("MarkovMachine class tests", function() {
    let mm = new MarkovMachine('the cat in the hat');
    beforeEach(function() {
        
    })
    
    test('MarkovMachine should generate word array upon initialization', function() {
        expect(mm.words).toEqual([ 'the', 'cat', 'in', 'the', 'hat' ]);
    }); 

    test('MarkovMachine should generate word chains upon initialization', function() {
        expect(mm.chains).toEqual({ the: [ 'cat', 'hat' ], cat: [ 'in' ], in: [ 'the' ], hat: [ null ] });
    });

    test('MarkovMachine makeText Function should output equal to or less than input number', function() {
        let textToArray = Array.from(mm.makeText(5));
        let count = 0
        for (let char of textToArray) {
            if (char === ' ') {
                count++;
            }
        }
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(5);
    })


})
