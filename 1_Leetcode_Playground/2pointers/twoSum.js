// 2 pointer solution

/**
 * 
 Runtime: 206 ms, faster than 16.09% of JavaScript online submissions for Two Sum.
Memory Usage: 39.3 MB, less than 88.74% of JavaScript online submissions for Two Sum.
 */

const twoSumPointers = function(nums, target) {
    if (nums.length <= 1) {
        return -1
    }
    let p1 = 0;
    let p2 = 1;
    while (p1 < nums.length) {
        if (nums[p1] + nums[p2] === target) {
            return [p1,p2]
        }
        if (p2 === nums.length - 1) {
            p1 +=1
            p2 = p1 +1
            if(p2 === nums.length) {
                return -1
            }
        } else {
            p2 +=1
        }
    }
};


/**
 * 
 * Runtime: 107 ms, faster than 63.08% of JavaScript online submissions for Two Sum.
Memory Usage: 40.5 MB, less than 47.26% of JavaScript online submissions for Two Sum.} nums 

 */
const twoSumObject = (nums, target) => {
    const map = {};
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
  
      if (complement in map) {
        return [map[complement], i];
      }
  
      map[nums[i]] = i;
    }
  
    return -1;
  };