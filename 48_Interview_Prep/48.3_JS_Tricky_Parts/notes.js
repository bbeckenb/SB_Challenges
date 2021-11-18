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
//adding a method
//define functions on the object prototype to minimize redefinition of the function for each instance


//Purpose of prototype obj
/**
 * JS uses this object to find methods and properties on everything in JS
 * If a property cannot be found, JS works it's way up the prototype chain finding the prototype of every object
 * looks on local instance prototype then looks on the parent object prototype, etc. etc.
 * Look into inheritance
 * function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.honk = function() {
  return 'Beep!';
};

function Car(make, model, year) {
  Vehicle.call(this, make, model, year); // similar to "super(make, model, year)"
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Notes on ES5 OOP
ES2015 does all of this under the hood
Make sure you’re able to explain what a prototype is
Be able to define the prototype chain, how inheritance can be implemented

 */

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


/*
 * var/ let/ const
 * new keyword
 * keyword this
 * reference types
 * immutability
 * hoisting??
 * call/ apply/ bind
 * arrow functions, bind
 * Why would you use or not use arrow functions?
 * setTimeout 0???
 * for loops with closure
 * callstack
 * 
 */