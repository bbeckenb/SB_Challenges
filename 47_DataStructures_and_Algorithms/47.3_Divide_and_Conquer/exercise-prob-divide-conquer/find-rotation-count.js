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

function findRotationCount(arr) {
  max_index = arr.length - 1;
  pivot = findPivot(0, max_index, arr);

  //if there is no pivot, it is a sorted list and therfore has not been sorted
  if (pivot === -1) {
      return 0;
  }
  //the location of the pivot is where the max lies and therefore by definition 
  //is how many indexes have been shifted through to get the max to that point
  //0-indexed, so 1 is added
  return pivot + 1;
}

// module.exports = findRotationCount
console.log(findRotationCount([7, 9, 11, 12, 15]))
console.log(findRotationCount([7, 9, 11, 12, 5]))
console.log(findRotationCount([15, 18, 2, 3, 6, 12]))