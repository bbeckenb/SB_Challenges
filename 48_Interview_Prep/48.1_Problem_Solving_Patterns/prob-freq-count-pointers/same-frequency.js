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
