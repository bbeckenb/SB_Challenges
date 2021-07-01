function sortedFrequency(arr, target) {
    leftPointer = 0;
    rightPointer = arr.length - 1;
    upperLim = -1;
    lowerLim = -1;

    // find upper lim
    while (rightPointer >= leftPointer) {
        let midPoint = Math.floor((leftPointer + rightPointer)/2);
        // console.log(leftPointer, midPoint, rightPointer)
        if (arr[midPoint] < target) {
            leftPointer = midPoint + 1;
        }
        else if (arr[midPoint] > target) {
            rightPointer = midPoint - 1;
        }
        else {
            if (arr[midPoint + 1] > target) {
                upperLim = midPoint;
                break;
            }
            else {
                leftPointer = midPoint + 1;
            }
        }
        // console.log(leftPointer, midPoint, rightPointer)
    }
    // console.log(upperLim)
    //find lower limit

    leftPointer = 0;
    rightPointer = arr.length - 1;
    // rightPointer = upperLim;

    while (rightPointer >= leftPointer) {
        let midPoint = Math.floor((leftPointer + rightPointer)/2);
        // console.log(leftPointer, midPoint, rightPointer)
        if (arr[midPoint] < target) {
            leftPointer = midPoint + 1;
        }
        else if (arr[midPoint] > target) {
            rightPointer = midPoint - 1;
        }
        else {
            if (arr[midPoint - 1] < target) {
                lowerLim = midPoint;
                break;
            }
            else {
                rightPointer = midPoint - 1;
            }
        }
        // console.log(leftPointer, midPoint, rightPointer)
    }
    // console.log(lowerLim)
    // console.log(upperLim, lowerLim);
    if (lowerLim === -1 && upperLim === -1 && arr[0] !== target) {
        return 0;
    }
    else if (lowerLim === -1 && upperLim === -1 && arr[0] === target) {
        return arr.length
    }
    else if (lowerLim === -1) {
        return upperLim + 1;
    }
    else if (upperLim === -1) {
        return arr.length - lowerLim;
    }
    else {
        return upperLim - lowerLim + 1;
    }
}

console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2))
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3))
console.log(sortedFrequency([2, 2, 2, 2, 2, 2, 2], 3))
console.log(sortedFrequency([2, 2, 2, 2, 2, 2, 2], 2))
console.log(sortedFrequency([1, 2, 2, 2, 2, 2, 2], 2))
console.log(sortedFrequency([2, 2, 2, 2, 2, 2, 3], 2))
console.log(sortedFrequency([1, 2, 2, 2, 2, 2, 2, 2, 3], 2))
console.log(sortedFrequency([1, 2, 2, 2, 2, 2, 2, 2, 3], 1))
console.log(sortedFrequency([1, 2, 2, 2, 2, 2, 2, 2, 3], 3))
console.log(sortedFrequency([1, 2, 2, 2, 2, 2, 2, 2, 3], 4))

// module.exports = sortedFrequency