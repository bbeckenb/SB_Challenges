function myBinarySearch(leftPointer, rightPointer, searchArr, target) {
    if (leftPointer > rightPointer) {
        return -1;
    }
    
    let midPoint = Math.floor((leftPointer + rightPointer)/2);
    
    if (searchArr[midPoint] == target) {
        return midPoint;
    }

    if (searchArr[midPoint] > target) {
        return myBinarySearch(leftPointer, midPoint - 1, searchArr, target);
    }
    
    // if searchArr[midPoint] < target
    return myBinarySearch(midPoint + 1, rightPointer, searchArr, target);
}

function findPivot(leftPointer, rightPointer, arr) {
    if (leftPointer > rightPointer) {
        return -1;
    }
    if (leftPointer == rightPointer) {
        return leftPointer;
    }

    let midPoint = Math.floor((leftPointer + rightPointer)/2);
    if (midPoint < rightPointer && arr[midPoint] > arr[midPoint + 1]) {
        return midPoint;
    }
    if (leftPointer < midPoint && arr[midPoint -1] > arr[midPoint]) {
        return midPoint - 1;
    }
    if (arr[leftPointer] >= arr[midPoint]) {
        return findPivot(leftPointer, midPoint - 1, arr);
    }
    return findPivot(midPoint + 1, rightPointer, arr);
}

function findRotatedIndex(arr, target, arr_length) {
    let pivot = findPivot(0, arr_length-1, arr);

    //there is no pivot, it is a normal sorted array, perform normal binary search
    if (pivot == -1) {
        return myBinarySearch(0, arr_length -1, arr, target);
    }
    //if the target turns out to be the pivot, return its location which we already discovered
    if (arr[pivot] == target) {
        return pivot;
    }

    //separate the search for the target into two searches around the pivot
    if (arr[0] <= target) {
        return myBinarySearch(0, pivot-1, arr, target);
    }
    return myBinarySearch(pivot+1, arr_length-1, arr, target);
}

// module.exports = findRotatedIndex

// findRotatedIndex([5,7,4,6,5,3,2,8], 3)
console.log(myBinarySearch(0, 12, [1,2,3,4,5,6,7,8,8,9,23,27,69], 4))
console.log(myBinarySearch(0, 12, [1,2,3,4,5,6,7,8,8,9,23,27,69], 69))
console.log(myBinarySearch(0, 12, [1,2,3,4,5,6,7,8,8,9,23,27,69], 100))
console.log(findPivot(0, 5, [37,44,66,102,10,22]));
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8, [6, 7, 8, 9, 1, 2, 3, 4].length))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3, [6, 7, 8, 9, 1, 2, 3, 4].length))
console.log(findRotatedIndex([37,44,66,102,10,22],14,[37,44,66,102,10,22].length))