//JS Tricky!
//Closures and IIFEs
/**
 * Closures - the ability for inner functions to remember variables defined in outer functions,
 * long after the outer function has returned
 * 
 * 
 */

function idGenerator() {
    let start = 0;
    return function generate() {
        start++;
        return start;
    };
}

//IIFE = immediately invoke function expression
// useful for scoping something right away and protecting the global namespace??
// study this!
const $ = (function() {
    const version = '3.1.4';
    return {
      displayVersion() {
        return version;
      },
      html(elem) {
        return document.querySelector(elem).innerHTML;
      }
    };
  })();

//JS OO under the hood
//'new' create new instance of class from pattern
    // creates a blank, plain JS obj
    //Links (sets constructor of) this object to another object
    //Passes the newly created object from step 1 as the 'this' context
    //returns 'this' if the function doesn't return its own obj
//every function is an obj

function bark() {
    return 'woof woof!';
}

//every function object has a property called 'prototype'
//property is an object itself, in obj, there is a special property called constructor
//constructor is going to point to the same function
//can see 'Link' by typing in 'Object.getPrototypeOf(obj)'



//Semicolons!
/**
 *  when the next line starts with code that breaks the current one (code can spawn on multiple lines)
    when the next line starts with a }, closing the current block
    when the end of the source code file is reached
    when there is a return statement on its own line
    when there is a break statement on its own line
    when there is a throw statement on its own line
    when there is a continue statement on its own line
 * https://www.freecodecamp.org/news/lets-talk-about-semicolons-in-javascript-f1fe08ab4e53/ 
 */