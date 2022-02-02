function freqCount(charArr) {
    outObj = {};
    for (let char of charArr) {
        outObj[char] = outObj[char] + 1 || 1;
    }
    return outObj;
}


function solution(S) {
    function freqCounter(charArr) {
        outObj = {};
        for (let char of charArr) {
            outObj[char] = outObj[char] + 1 || 1;
        }
        return outObj;
    }
    let freqString = freqCounter(S);
    for (let key of Object.keys(freqString)) {
        if (freqString[key] === 2) {
            return key;
        }
    }
}

solution('aba');