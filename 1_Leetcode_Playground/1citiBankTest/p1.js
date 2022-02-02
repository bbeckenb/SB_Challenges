function freqCount(arr) {
    outObj = {};
    for (let num of numArr) {
        outObj[num] = outObj[num] + 1 || 1;
    }
    return outObj;
}


function solution(A, B) {
    function sideCalculator(s1, s2) {
        let possibleSideLengths = [];
        for(let i = s1; i >= s2; i--) {
            let sideLength = Math.floor(i/2);
            if (s2 >= sideLength * 2) {
                possibleSideLengths.push(sideLength)
            } else {
                sideLength = Math.floor(i/3);
                if (s2 >= sideLength) {
                    possibleSideLengths.push(sideLength)
                } else {
                    possibleSideLengths.push(sideLength)
                }
            }
        }
        return Math.max(...possibleSideLengths);
    }
    //cornercase smallest A & B can be to make a square is 2 & 2
    if(A < 2 && B < 2) return 0
    
    if (A >= B) {
        return sideCalculator(A, B)
    } else {
        return sideCalculator(B, A) 
    }
}

solution(13, 11);