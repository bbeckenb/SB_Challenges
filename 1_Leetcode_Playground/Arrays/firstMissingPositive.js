/**
 * Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses constant extra space.

Example 1:

Input: nums = [1,2,0]
Output: 3
Example 2:

Input: nums = [3,4,-1,1]
Output: 2
Example 3:
*/

function firstMissingPositive(nums) {
    const arrSet = new Set();

    for (let i=0; i<nums.length; i++) {
        if(nums[i] > 0) {
            arrSet.add(nums[i]);
        }
    }

    for (let i=1; i<=nums.length+1; i++) {
        if(!arrSet.has(i)) {
            return i;
        }
    }
}