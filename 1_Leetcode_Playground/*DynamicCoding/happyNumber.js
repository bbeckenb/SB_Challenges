function happyNumber(num) {
    let digitArr = [];
    let cycleSet = new Set();
    while(num !== 1 && !cycleSet.has(num)) {
        let numHolder = num;
        cycleSet.add(numHolder);
        while (numHolder > 0) {
            let digit = numHolder%10;
            digitArr.push(digit);
            numHolder = Math.floor(numHolder/10);
        }
        num = 0;
        for (let i of digitArr) {
            num += i**2
        }
        digitArr = [];
    }
    if (num === 1) return true
    return false
}

happyNumber(19);