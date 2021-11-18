/**
 * 1.
 * Q: What is a potential pitfall with using typeof bar === "object" 
 * to determine if bar is an object? How can this pitfall be avoided?
 * A: the gotcha is that null is also considered an object
 * function though an object, will return false as well
 * with all of this considered we would need to check:
 * if(bar!==null && typeof(bar) === object || typeof(bar) === function)
 * 
 * 2.
 * Q: What will the code below output to the console and why? 
 * (function(){ var a = b = 3; })(); 
 * console.log("a defined? " + (typeof a !== 'undefined')); 
 * console.log("b defined? " + (typeof b !== 'undefined'));
 * A: function def will output 'undefined'
 * a defined? false
 * b defined? true
 * But in fact, var a = b = 3; is actually shorthand for:
    b = 3;
    var a = b;
 * 
 * What will the code below output to the console and why? 
 * var myObject = { foo: "bar", func: function() { var self = this; console.log("outer func: this.foo = " + this.foo); 
 * console.log("outer func: self.foo = " + self.foo); 
 * (function() { console.log("inner func: this.foo = " + this.foo); 
 * console.log("inner func: self.foo = " + self.foo); }()); } }; 
 * myObject.func();
 * 
 */