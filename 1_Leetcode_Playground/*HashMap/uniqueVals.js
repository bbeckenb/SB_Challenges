function uniqueVals(nums) {
    let uniqueSet = new Set();

    for (let num of nums) {
        if (uniqueSet.has(num)) {
            return true
        }
        uniqueSet.add(num)
    }
    return false
}

uniqueVals([1,5,-2,-4,0]);

function uniqueValsInProx(nums, k) {
    let mapObj = {};
    for (let i=0; i<nums.length; i++) {
        if (mapObj[nums[i]] === undefined) {
            mapObj[nums[i]] = i;
        } else {
            if(i - mapObj[nums[i]] <= k) return true
            mapObj[nums[i]] = i;
        }
    }
    return false
}

uniqueValsInProx([1,2,3,1], 3)