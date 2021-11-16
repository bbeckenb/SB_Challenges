/**
 * Understand the Problem
 * Explore Concrete Examples
 * Break It Down
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 * Restate problem in your own words
    *  What are the inputs and outputs?
    * Do I have enough info?
    * How should I label the important pieces of data that are a part of the problem
 * 
 * Explore Concrete Examples:
    * start with simple examples
    * progress to more complex examples
    * explore examples with empty inputs
    * explore examples with invalid inputs 
 *
 * Break it down!
    * Take out the corner cases, make a base piece of code and add logic to handle narrower cases
 *
 * Use tools strategically! Don't just pass a bunch of numbers in/ brute force things
    * Use your debugger!
    * Form a hypothesis about where problems might be stemming from   
 *  
 * Look back and refactor
    * Does your solution handle all cases?
    * Talk through time-complexity/ areas of improvement for your code
 * 
 * Good to have a convo at end / be curious ask for feedback or best case solutions  
 * 
 * make helper functions to make frequency counter
 * make frequency counters to avoid needing to make for loops/ nested for loops
 * 
 */

function freqCounter(str) {
    outputObj = {};
    for (let char of str) {
        outputObj[char] = outputObj[char] + 1 || 1;
    }
    return outputObj;
}

function validAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;
    let freq1 = freqCounter(str1);
    let freq2 = freqCounter(str2);
    let obj1Keys = Object.keys(freq1)
    for (let k of obj1Keys) {
        if (!(k in freq1) || freq1[k] !== freq2[k]) {
            return false
        }
    }
    return true
}

console.log(validAnagram('iceman', 'cinema'));