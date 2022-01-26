/*
 Runtime: 76 ms, faster than 85.93% of JavaScript online submissions for Binary Search.
Memory Usage: 42.6 MB, less than 18.79% of JavaScript online submissions for Binary Search.
*/

function binSearch(nums, target) {
    let p1 = 0;
    let p2 = nums.length - 1;
    while (p1 <= p2) {
        let midPoint = Math.floor((p2 + p1)/2);
        if (nums[midPoint] === target) {
            return midPoint;
        } else if (nums[midPoint] > target) {
            p2 = midPoint - 1;
        } else {
            p1 = midPoint + 1;
        }
    }
    return -1;
}