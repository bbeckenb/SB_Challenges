/**
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:

Input: nums = [1]
Output: 1
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
 */

const maxSubArray = function(nums) {
    let max1 = nums[0];
    let max2 = nums[0];
    for(let i=1; i<nums.length; i++){
        max1 = Math.max(nums[i] , max1 + nums[i])
        
        if(max1 > max2){
            max2 = max1;
        }
    }
    return max2;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);