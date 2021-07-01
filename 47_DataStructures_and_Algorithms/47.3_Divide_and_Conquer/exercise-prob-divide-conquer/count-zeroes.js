function countZeroes(arr) {
    // [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
    // [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
    let leftPointer = 0;
    let rightPointer = arr.length - 1;
    while(leftPointer <= rightPointer) {
        let midPoint = Math.floor((leftPointer + rightPointer)/2);
        console.log(leftPointer, rightPointer, midPoint)
        if (arr[midPoint] === 0) {
            if (arr[midPoint - 1] === 1) {
                zeros = arr.length - midPoint;
                console.log(zeros)
                return zeros;
            } 
            else {
                rightPointer = midPoint - 1;
            }
        }
        else {
            if (arr[midPoint + 1] === 0) {
                zeros = arr.length - midPoint -1;
                console.log(zeros)
                return zeros;
            }
            else {
                leftPointer = midPoint + 1;
            }
        } 
       
    }
    if (arr[0] === 1 || arr == []) {
        return 0;
    }
    else {
        return arr.length;
    } 
}

// module.exports = countZeroes


console.log(countZeroes([1, 1, 1, 1, 0, 0]))
console.log(countZeroes([1, 0, 0, 0, 0]))
console.log(countZeroes([0, 0, 0]))
console.log(countZeroes([1, 1, 1, 1]))
