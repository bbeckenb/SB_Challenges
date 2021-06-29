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
// Simplifies to O(4n) => O(n)

// O(1000 * log(n) + n)
// Simplifies to O(1000n) => O(n)

// O(1000 * n * log(n) + n)
// Simplifies to O(n log(n))

// O(2^n + n^2)
// Simplifies to O(2^n)

// O(5 + 3 + 1)
// Simplifies to O(1)

// O(n + n^(1/2) + n^2 + n * log(n)^10)
// Simplifies to O(n^2)


function logUpTo(n) {
    for (let i = 1; i <= n; i++) {
      console.log(i);
    }
  }
  
  logUpTo(10)
  logUpTo(100)
  logUpTo(1000)
// O(n)

  // Time Complexity:
  
  function logAtLeast10(n) {
    for (let i = 1; i <= Math.max(n, 10); i++) {
      console.log(i);
    }
  }
  // O(n)

  // Time Complexity:
  
  function logAtMost10(n) {
    for (let i = 1; i <= Math.min(n, 10); i++) {
      console.log(i);
    }
  }
//   O(1)
  // Time Complexity:
  
  function onlyElementsAtEvenIndex(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (i % 2 === 0) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
//   O(n)
  // Time Complexity:
  
  function subtotals(array) {
    let subtotalArray = [];
    for (let i = 0; i < array.length; i++) {
      let subtotal = 0;
      for (let j = 0; j <= i; j++) {
        subtotal += array[j];
      }
      subtotalArray.push(subtotal);
    }
    return subtotalArray;
  }
//  O(n^2)
  // Time Complexity:
  
  function vowelCount(str) {
    let vowelCount = {};
    const vowels = "aeiouAEIOU";
  
    for (let char of str) {
      if(vowels.includes(char)) {
        if(char in vowelCount) {
          vowelCount[char] += 1;
        } else {
          vowelCount[char] = 1;
        }
      }
    }
  
    return vowelCount;
  }
//   O(log(n)) because of dictionary mapping efficiency WRONG O(n)
// Answer the following questions

// True or false: n^2 + n is O(n^2).
// True
// True or false: n^2 * n is O(n^3).
// True
// True or false: n^2 + n is O(n).
// False
// What’s the time complexity of the .indexOf array method?
// O(n)
// What’s the time complexity of the .includes array method?
// O(n)
// What’s the time complexity of the .forEach array method?
// O(n)
// What’s the time complexity of the .sort array method?
// O(n) WRONG O(n log n)
// What’s the time complexity of the .unshift array method?
// O(n)
// What’s the time complexity of the .push array method?
// O(1)
// What’s the time complexity of the .splice array method?
// O(n)
// What’s the time complexity of the .pop array method?
// O(1)
// What’s the time complexity of the Object.keys() function?
// O(n)
// BONUS

// What’s the space complexity of the Object.keys() function?
// O(n)