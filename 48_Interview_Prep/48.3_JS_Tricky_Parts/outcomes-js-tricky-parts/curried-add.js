function curriedAdd(total) {
    if (total === undefined) {
        return 0
    }
    let sum = total;
    return function outputSum(addNum) {
        if(addNum === undefined) {
            return sum;
        } else {
            sum += addNum
            return outputSum;
        }
    }
}

module.exports = { curriedAdd };

function isPalindrome(str) {
    let p1 = 0
    let p2 = str.length-1;
    while (p1>=p2) {
        if (str[p1] !== str[p2]) {
            return false
        }
        p1++;
        p2--;
    }
    return true;
}
