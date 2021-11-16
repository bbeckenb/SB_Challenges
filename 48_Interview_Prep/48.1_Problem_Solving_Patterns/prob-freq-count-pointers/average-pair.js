// add whatever parameters you deem necessary
/**
 * Understand the Problem 
    * Inputs = sorted array of type int, target avg
    * Logic Goal = see if a target avg can be achieved from a pair in the list
    * Output = bool - true, false 
    * Quick Checks = list has at least 1 #
 * Explore Concrete Examples
    averagePair([1, 2, 3], 2.5); // true
    averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
    averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
    averagePair([], 4); // false
 * Break It Down
    * Need freqCounter 
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */



// function averagePair(numArr, avgTarget) {
//     function freqCounter(numArr) {
//         let outputObj = {};
//         for (let num of numArr) {
//             outputObj[num] = outputObj[num] + 1 || 1;
//         }
//         return outputObj;
//     }
//     let freqCounterNum = freqCounter(numArr);
//     for (let num of numArr) {
//         if (((avgTarget*2)-num) in freqCounterNum) {
//             return true
//         }
//     }
//     return false
// }

function averagePair(numArr, avgTarget) {
    let left = 0;
    let right = numArr.length - 1;
    while (left < right) {
        // let midPoint = (Math.floor((left + right)/2));
        let avg = (numArr[left] + numArr[right])/2;
        if (avg === avgTarget) {
            return true;
        } else if (avg > avgTarget) {
            right--;
        } else {
            left++;
        }
    }
    return false;
}


averagePair([1, 2, 3], 2.5)
averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)
