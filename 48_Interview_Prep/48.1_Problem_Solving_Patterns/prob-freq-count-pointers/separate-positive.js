// add whatever parameters you deem necessary
/**
 * Understand the Problem 
    * Inputs = array of non-zero ints
    * Logic Goal = put positive #'s to left, negative #'s to right
    * Output = in-place separated array
    * Quick Checks = list has at least 1 #
 * Explore Concrete Examples
    separatePositive([2, -1, -3, 6, -8, 10]) // [2, 10, 6, -3, -1, -8]
    separatePositive([5, 10, -15, 20, 25]) // [5, 10, 25, 20, -15]
    separatePositive([-5, 5]) // [5, -5]
    separatePositive([1, 2, 3]) // [1, 2, 3]
 * Break It Down
    * Need multiple pointers (a pointer?)
 * Solve a Simpler Problem
 * Use Tools Strategically
 * Look Back and Refactor
 * 
 */

function separatePositive(arr) {
    let idx=0;
    let count=0;
    while (count<arr.length) {
        if (arr[idx] < 0) {
           let moveToBack = arr.splice(idx, 1);
           arr.push(moveToBack[0]); 
        } else {
            idx++;
        }
        count++;
    }
    return arr;
}

