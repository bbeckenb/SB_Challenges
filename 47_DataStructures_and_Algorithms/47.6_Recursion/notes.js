
/*
Recursion
-Function calling itself
-don't want to create a stack overflow
-need to add stopping point to make sure we don't recurse forever!
-anything we use a loop on, we can use recursion on
    -choosing between the two is a performance question
-Two key requirements for recursion
    -recall the acting function within itself
    -base case
        -brick wall where we return and stop recursing
        -otherwise we will have an 'infinite loop' until we hit a stack overflow
            -Maximum callstack size exceeded

*/

// example return the sum of a list using recursion
function sum_of_list(nums) {
    //base case
    if(nums.length === 0) return 0;
    //normal case
    return nums[0] + sum_of_list(nums.slice(1))
}

console.log(sum_of_list([1,2,3,4,5,6]));


//example function list doubler, iterative method does not allow for nth levels of nestedness
//iterative method
function doubler_iterative(nums) { 
    stack = nums.reverse();

    while (stack.length > 0) {
      let n = stack.pop();
      if (Array.isArray(n)) {
        // If array, add it to stack, reversed
        for (let inner of n.reverse()) {
          stack.push(inner);
        }
      } 
      else {
        console.log(n * 2);
      }
    }
}

data = [ 1, [2, [3, [7, [8, [9, 10, [14]]]]], 4], 5 ]
doubler_iterative(data);

//recursive method
function doubler_recursive(nums) {
    //base case
    if(nums.length === 0) return;

    //normal case
    let n = nums.pop();
    if (Array.isArray(n)) {
        doubler_recursive(n);
    }
    else {
        console.log(n*2);
    }
}

doubler_recursive(data);

//Can test yourself parsing, anytime you are working with nesting, recursion is a potential option


/*

Big O of recursion operations
-We do not want to be creating new arrays and passing them and putting them in memory as 
-more calls are waiting on the stack
-Passing index (if possible) is a more efficient method

*/