function freqCount(arr) {
    outObj = {};
    for (let num of numArr) {
        outObj[num] = outObj[num] + 1 || 1;
    }
    return outObj;
}


function solution(A, B) {
    function sideCalculator(longStick, shortStick) {
        let possibleSideLengths = [];
        possibleSideLengths.push(Math.floor(shortStick/2));
        if (Math.floor(longStick/3) <= shortStick) {
            possibleSideLengths.push(Math.floor(longStick/3));
        }
        possibleSideLengths.push(Math.floor(longStick/4));
        return Math.max(...possibleSideLengths);
    }
    //cornercase smallest combined integer value between A & B to make a square is 4
    if(A + B < 4) return 0
    
    if (A >= B) {
        return sideCalculator(A, B)
    } else {
        return sideCalculator(B, A) 
    }
}

solution(1,3);
solution(1, 8);
solution(13, 11);
solution(10, 21);