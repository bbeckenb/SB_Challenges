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

function findFloor(leftPointer, rightPointer, arr, target) {
  console.log(leftPointer, rightPointer,target)
    if (leftPointer == rightPointer) {
      if (arr[leftPointer] > target) {
         console.log(arr[leftPointer], target) 
        if (leftPointer > 0 && arr[leftPointer - 1] < target){
            return arr[leftPointer - 1]
        }
        return -1;
      }
      else {
          return arr[leftPointer];
      }
    }
      let midPoint = Math.floor((leftPointer + rightPointer)/2);
      if (arr[midPoint] === target) {
          return target;
      }
      if (arr[midPoint] > target) {
          return findFloor(leftPointer, midPoint -1, arr, target);
      }
    //   if (arr[midPoint] <= target) {
    return findFloor(midPoint + 1, rightPointer, arr, target);
    //   }
}

// module.exports = findFloor
// console.log(findFloor(0,[1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 9));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 1));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 2));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 8));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 10));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 12));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 19));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 0));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 20));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 3));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 4));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 7));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 11));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 13));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 18));
console.log(findFloor(0, [1,2,8,10,10,12,19].length -1, [1,2,8,10,10,12,19], 100));