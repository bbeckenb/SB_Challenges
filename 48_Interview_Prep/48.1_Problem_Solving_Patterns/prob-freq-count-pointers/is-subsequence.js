// add whatever parameters you deem necessary
/**
 * Understand the Problem 
    * Inputs = string 1 = subsequence, string 2 equals full string
    * Logic Goal = is the first string contained IN SEQUENCE in the second string?
    * Output = boolean - true/false
    * Quick Checks = 2nd string length > 1st string length
 * Explore Concrete Examples
    isSubsequence('hello', 'hello world'); // true
    isSubsequence('sing', 'sting'); // true
    isSubsequence('abc', 'abracadabra'); // true
    isSubsequence('abc', 'acb'); // false (order matters)
 * Break It Down
    * Need multiple pointers
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */
function isSubsequence(sub, full) {
    let count=0; 
    for (let idx=0; idx<full.length; idx++) {
        if (full[idx] === sub[count]) {
            count++;
            if (count === sub.length) {
                return true
            }
        }
    }
    return false
}

