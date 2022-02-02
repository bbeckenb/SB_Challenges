/**
 Runtime: 111 ms, faster than 22.96% of JavaScript online submissions for Search Insert Position.
Memory Usage: 42.1 MB, less than 6.61% of JavaScript online submissions for Search Insert Position.
 */

let searchInsert = function(nums, target) {
    let lowerBound = nums[0];
    let upperBound = nums[nums.length-1];
    if (target < lowerBound) {
        return 0
    }
    if (target > upperBound) {
        return nums.length
    }
    let p1 = 0;
    let p2 = nums.length - 1;
    let midPoint;
    while (p1 <= p2) {
        midPoint = Math.floor((p2 + p1)/2);
        if (nums[midPoint] === target) {
            return midPoint;
        } else if (nums[midPoint] > target) {
            p2 = midPoint - 1;
        } else {
            p1 = midPoint + 1;
        }
    }
    return p1;
};

console.log(searchInsert([1,3,5,6], 2))