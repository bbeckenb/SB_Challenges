/**
 * Understand the Problem 
    * Inputs = message, letters
    * Logic Goal = see if message can be built with letters
    * Output = bool - true, false 
    * Quick Checks = letters length >= msg length
 * Explore Concrete Examples
    * constructNote('aa', 'abc') // false
    * constructNote('abc', 'dcba') // true
    * constructNote('aabbcc', 'bcabcaddff') // true 
 * Break It Down
    * Need freqCounter 
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */

// add whatever parameters you deem necessary


function constructNote(msg, letters) {
    function freqCounter(str) {
        let outputObj = {};
        for (let char of str) {
            outputObj[char] = outputObj[char] + 1 || 1;
        }
        return outputObj;
    }
    //Quick Checks!
    if (msg === '') return true;
    if (letters.length < msg.length) return false;
    //Going to compare the freq count of letters to 
    //freq count of msg, make sure letters count is >= msg count
    const freqCounterMsg = freqCounter(msg);
    const freqCounterLetters = freqCounter(letters);
    for (let key of Object.keys(freqCounterMsg)) {
        if (!(key in freqCounterLetters) || freqCounterLetters[key] < freqCounterMsg[key]) {
            return false;
        }
    }
    return true;
}

console.log(constructNote("abcd", ""))//(false);
console.log(constructNote("", "abc"))//(true);
console.log(constructNote("aa", "abcd"))//(false);
console.log(constructNote("skbjjjvnnd", "fdjlkjfeburevjvnfnsjckjncjdnchbechbadhsd"))//(true);
console.log(constructNote("abc", "abcd"))//(true);
