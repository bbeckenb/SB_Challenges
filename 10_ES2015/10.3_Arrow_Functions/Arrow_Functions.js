//NOTES, EXERCISE BELOW
//cannot use w/ function declaration, ex below
function greet() {

}

//can replace anonymous function w/ arrow functions

//function expression
const add = function(x,y) {
    return x+y;
};

//could be written short-hand w/ arrow functions
const addition = (x,y) => {
    return x+y;
};

//another example
[2,3,6,78,99,104,23].reduce((max, currNum) => {
    return Math.max(max, currNum);
});

//if you have a single parameter, you can write w/ no parentheses
[1,2,3,4].forEach(n => {
    console.log(n*10);
});

//if it provides an implicit return and one expression, you can simplify further
[1,2,3,4,5,6].filter((num) => num % 2 ===0);

let two_times = (n) => n*2;

console.log([2,3,6,78,99,104,23].reduce((max, currNum) => {
    return Math.max(max, currNum);
}));

console.log(addition(5,8));

/* gotchas - BE CAREFUL using arrow functions with object literals, wrap curly 
braces of object literal w/ parens

be careful using arrow function with 'this.' */

/*Babel is a tool that will turn our code into something that will work
in internet explorer/ all browsers*/
//--------------------------------------------------------------------
//Arrow Functions Exercise

//ES5 Map Callback
/*
function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}*/

/*ES2015 Arrow Functions Shorthand
Refactor the above code to use two arrow functions. 
Turn it into a one-liner.*/

const double = arr => arr.map(val => val*2); 

/*Write an ES2015 Version 
Refactor the following function to use arrow functions:


Replace ALL functions with arrow functions: */
/*
function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}
*/

const squareAndFindEvens = numbers => numbers.map(num => num**2).filter(square => square % 2 === 0);

