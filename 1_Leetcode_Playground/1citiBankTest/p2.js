function freqCount(arr) {
    outObj = {};
    for (let num of numArr) {
        outObj[num] = outObj[num] + 1 || 1;
    }
    return outObj;
}


function balloonQ(A) {
    function freqCount(charArr) {
        outObj = {};
        for (let char of charArr) {
            outObj[char] = outObj[char] + 1 || 1;
        }
        return outObj;
    }

    let freqString = freqCount(S);
    let balloonCounts = [
                            freqString['B'],
                            freqString['A'],
                            Math.floor(freqString['L']/2),
                            Math.floor(freqString['O']/2),
                            freqString['N']
                        ] 
    return Math.min(...balloonCounts);
}

solution(1);