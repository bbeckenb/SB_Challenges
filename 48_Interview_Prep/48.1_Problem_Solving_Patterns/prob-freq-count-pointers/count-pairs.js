// add whatever parameters you deem necessary
/**
 * Understand the Problem 
    * Inputs = array of integers and a single int
    * Logic Goal = # of pairs that summed equal target
    * Output = boolean - true/false
    * Quick Checks = 2nd string length > 1st string length
 * Explore Concrete Examples
    countPairs([3,1,5,4,2], 6) // 2 (1,5 and 2,4)
    countPairs([10,4,8,2,6,0], 10) // 3 (2,8, 4,6, 10,0)
    countPairs([4,6,2,7], 10) // 1 (4,6)
    countPairs([1,2,3,4,5], 10) // 0
    countPairs([1,2,3,4,5], -3) // 0
    countPairs([0,-4],-4) // 1
    countPairs([1,2,3,0,-1,-2],0) // 2
 * Break It Down
    * Need multiple pointers
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */


function countPairs(numArr, target) {
    function freqCount(arr) {
        outObj = {};
        for (let num of numArr) {
            outObj[num] = outObj[num] + 1 || 1;
        }
        return outObj;
    }
    let count = 0;
    let lookUp = freqCount(numArr);
    for (let key of Object.keys(lookUp)) {
        if ((target-key) in lookUp) {
            count++;
        }
    }
    return Math.floor(count/2);
}
