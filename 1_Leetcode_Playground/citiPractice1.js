function freqCount(arr) {
    outObj = {};
    for (let num of numArr) {
        outObj[num] = outObj[num] + 1 || 1;
    }
    return outObj;
}
// inputs = array
// goal given some array, returns smallest positive integer greater than 0 not in A



function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    // part 1, create a Set, load positive unique values to it
    let setArr = new Set();
    for (let i=0; i< A.length; i++) {
        if (A[i] > 0) {
            setArr.add(A[i]);
        }
    }
    //part 2, count up from 1, return the first smallest integer the Set does not contain
    for (let i=1; i<=A.length + 1; i++) {
        if (!setArr.has(i)) {
            return i;
        }
    }
}

solution([1, 2,3]);