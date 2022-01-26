/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.


Example 1:

Input: nums = [2,2,1]
Output: 1
Example 2:

Input: nums = [4,1,2,1,2]
Output: 4
Example 3:

Input: nums = [1]
Output: 1
 */

/**
 Runtime: 88 ms, faster than 71.94% of JavaScript online submissions for Single Number.
Memory Usage: 44.7 MB, less than 14.26% of JavaScript online submissions for Single Number.
 */

const singleNumber = function(nums) {
    const freqCounter = {};
    for (let num of nums) {
        freqCounter[num] = freqCounter[num] + 1 || 1;
    }
    return Object.keys(freqCounter).find(key => freqCounter[key] === 1);
};

singleNumber([2,2,1,1,1,1,3])