// # how do we know how fast something is?
// # what makes things inefficient?
// # need to understand Big O

function addUpToFirst(n) {
    let total = 0
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

function addUpToSecond(n) {
    return n * (n + 1) / 2;
}

// let's focus on speed
// instead of timer - we will count the number of simple operations 
// and that should roughly map for us

function addUpToSecond(n) {
    return n * (n + 1) / 2;
}

// there are 3 operations in the above function (*, +, /), no matter the size of n

function addUpToFirst(n) {
    let total = 0
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
// i++, total +=1, as n grows, the number of operations grows proportionately

//Big O number of operations grows as size of input
//Big O of 1 "O(1)" means number of operations remains the same as n increases

//Loops and nested loops are generally bad for speed in relation to increased 'n'
//Runs in roughly O(n^2)

function allEven(nums) {
    let loopCount = 0;
    for (let i=0; i< nums.length; i++) {
        loopCount++;
        if(nums[i] % 2 !== 0) {
            console.log("LOOP COUNT:", loopCount)
            return false;
        }
    }
    console.log("LOOP COUNT:", loopCount)
    return true;
}

//Big O notation focuses on the worst case ^^ the above will scale with n in the worst case
// Constants do not matter
// variable assignment is constant

function doBigMath(x) {
    return x * 2387673487632874623 * 82363278848734 + 1;
}
// above has big O of 1

//constant assignment to variables has big O of 1
function makeVars(n) {
    const n1 = n;
    const n2 = n;
    const n3 = n;
}

function getThirdEl(arr) {
    return arr[3]
}

//the way arrays work, no matter the size, if you have index, grabbing val at that location is nearly instantaneous (mapping)
//same with objects
//constant time

function squareAll(arr) {
    for (let i=0; i<arr.length; i++) {
        return arr[i] * arr[i];
    }
}
 // number of operations, increases O(n)
// There is a Big-O complexity chart
// O(1) and O(log(n)) are the fastest

// for n = 100
// Type       Function      Result
// Constant     1               1
// Logarithmic  log n           ~7
// Linear       n               100
// Logarithmic  n log n         ~664
// Quadratic    n^2             10000
// exponential  2^n             rly big #
// Factorial    n!              EVEN BIGGER #

// a loop does not mean it's O(n)
// a nested loop does not mean its O(n^2)

// O(n + 10)
// Simplifies to O(n)

// O(100 * n)
// Simplifies to O(n)

// O(25)
// Simplifies to O(1)

// O(n^2 + n^3)
// Simplifies to O(n^3)

// O(n + n + n + n)

// O(1000 * log(n) + n)

// O(1000 * n * log(n) + n)

// O(2^n + n^2)

// O(5 + 3 + 1)

// O(n + n^(1/2) + n^2 + n * log(n)^10)
