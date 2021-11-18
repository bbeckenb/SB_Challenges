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
