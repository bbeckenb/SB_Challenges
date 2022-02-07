function majorityElem(nums) {
    function freqCounter(nums) {
        outputObj = {};
        for (let i of nums) {
            outputObj[i] = outputObj[i] + 1 || 1;
        }
        return outputObj;
    }
    const numsCount = freqCounter(nums); 
    let numMaxFreq = Math.max(...Object.values(numsCount));
    for (let key of Object.keys(numsCount)) {
        if (numsCount[key] === numMaxFreq) {
            return key
        }
    }
}

majorityElem([3,2,3])