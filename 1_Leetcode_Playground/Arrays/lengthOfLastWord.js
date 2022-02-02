/**
Runtime: 60 ms, faster than 99.45% of JavaScript online submissions for Length of Last Word.
Memory Usage: 42.3 MB, less than 5.48% of JavaScript online submissions for Length of Last Word.ns 
 */

const lengthOfLastWord = function(s) {
    let wordArr = s.trim().split(" ");
    return wordArr[wordArr.length-1].length
};