/**
 * Understand the Problem 
    * Inputs = stray of keys, stray of values
    * Logic Goal = build an obj making kvp's from 2 str's, left over keys get val of null, left over vals get ignored
    * Output = bool - true, false 
    * Quick Checks = letters length >= msg length
 * Explore Concrete Examples
    sameFrequency(182,281) // true
    sameFrequency(34,14) // false
    sameFrequency(3589578, 5879385) // true
    sameFrequency(22,222) // false
 * Break It Down
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */

// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    function freqCounterNumtoStr(num) {
        str = num.toString();
        let outObj = {};
        for (let char of str) {
            outObj[char] = outObj[char] + 1 || 1;
        }
        return outObj;
    }
    let num1Freq = freqCounterNumtoStr(num1);
    let num2Freq = freqCounterNumtoStr(num2);
    for (let key of Object.keys(num1Freq)) {
        if (!(key in num2Freq) || num1Freq[key] !== num2Freq[key]) {
            return false
        }
    }
    return true;
}

sameFrequency(182, 281)


// # Input = Array of ints
// # Objective = Create pairs consisting of equal #s, each array elem 
// # can belong to one pair only
// # Can all of the integers be used?

function freqCounter(numArr) {
    let outObj = {};
    for (let num of numArr) {
        outObj[num] = outObj[num] + 1 || 1;
    }
    return outObj;
}

function pairCount(A) {
    function freqCounter(numArr) {
        let outObj = {};
        for (let num of numArr) {
            outObj[num] = outObj[num] + 1 || 1;
        }
        return outObj;
    }
    const numFreq = freqCounter(A);
    for (let key of Object.keys(numFreq)) {
        if (numFreq[key] % 2 !== 0) {
            return false
        }
    }
    return true
}

pairCount([1,2,2,3]);



/**
 * Understand the Problem 
    * Inputs = Array of Positive Ints, length N
    * Logic Goal = Find largest possible even sum of K elements at different positions
    * Output = largest possible even sum 
    * Quick Checks = letters length >= msg length
 * Explore Concrete Examples
 * Break It Down
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */



/**
 * Understand the Problem 
    * Inputs = String
    * Logic Goal = Find largest possible even sum of K elements at different positions
    * Output = largest possible even sum 
    * Quick Checks = letters length >= msg length
 * Explore Concrete Examples
    sameFrequency(182,281) // true
    sameFrequency(34,14) // false
    sameFrequency(3589578, 5879385) // true
    sameFrequency(22,222) // false
 * Break It Down
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */

function largestLetterPair(S) {
    function letterValObj(str) {
        let outObj = {};
        for (let char of str) {
            outObj[char] = char.charCodeAt(0);
        }
        return outObj;
    }
    const letterValues = letterValObj(S)
    let largestChar = '@' //ASCII value below start of letter characters
    for (let key of Object.keys(letterValues)) {
        if (key !== key.toUpperCase()) {
            if (key.toUpperCase() in letterValues && key.charCodeAt(0) > largestChar.charCodeAt(0)) {
                largestChar = key
            }
        }
    }
    return largestChar === '@' ? 'NO' : largestChar.toUpperCase() 
}

largestLetterPair('WeTestCodErs')