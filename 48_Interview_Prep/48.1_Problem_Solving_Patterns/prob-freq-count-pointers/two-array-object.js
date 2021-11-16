/**
 * Understand the Problem 
    * Inputs = array of keys, array of values
    * Logic Goal = build an obj making kvp's from 2 arr's, left over keys get val of null, left over vals get ignored
    * Output = bool - true, false 
    * Quick Checks = letters length >= msg length
 * Explore Concrete Examples
    twoArrayObject(['a', 'b', 'c', 'd'], [1, 2, 3]) // {'a': 1, 'b': 2, 'c': 3, 'd': null}
    twoArrayObject(['a', 'b', 'c'], [1, 2, 3, 4]) // {'a': 1, 'b': 2, 'c': 3}
    twoArrayObject(['x', 'y', 'z'], [1, 2]) // {'x': 1, 'y': 2, 'z': null}
 * Break It Down
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */

// add whatever parameters you deem necessary

function twoArrayObject(arrKeys, arrVals) {
    let outObj = {}
    for (let idx=0; idx<arrKeys.length; idx++) {
        if (idx <= arrVals.length - 1) {
            outObj[arrKeys[idx]] = arrVals[idx];
        } else {
            outObj[arrKeys[idx]] = null;
        }
    }
    return outObj;
}

twoArrayObject(["a", "b", "c"], [1, 2, 3])
