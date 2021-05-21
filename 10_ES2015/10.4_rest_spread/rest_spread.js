//Operators
//Use spread to copy arrays and objects
//Use rest to gather remaining arguments in an array

//... syntax

//arguments is an array-like object, does not behave like a normal array
//used to have a really ugle way to access arguments

function sum() {
    const args = Array.from(arguments);
    return args.reduce((sum, val) => {
        return sum +val;
    });
}

//the above works, but it is clunky, we use the rest operator to fix this
//Depends on context, collects all arguments and stores them in an array of your name choice
//you can type any number of arguments into sum function below
function sum(...nums) {
    return nums.reduce((sum, n) => sum + n);    
}

//rest collects the rest of the arguments if you want more defined args
//passed in first

function makeFamily(p1, p2, ...kids) {
    console.log(p1, p2);
    console.log(kids);
    return {
        parents: [p1, p2],
        children: kids.length ? kids : 0
    };
}

//Spread we can use in different scenarios than just defining a function
//can apply it to declared arrays and objects
const nums = [3,4,6,3,5,6,7,5];
console.log(Math.max(...nums));

//array iterables
const palette = ['red', 'purple', 'blue'];
const palette_2 = ['green', 'gold'];
//creating a copy 'const paletteCopy = palette' does not make a copy
//const paletteCopy = palette.slice(); //does make a copy
//can make a copy with '.concat('')'
//can make a clone w/ spread and add to it
const paletteCopy = [...palette, 'orange'];
//can use spread to pull elements from declared arrays into a new array
const colors = [...palette, ...palette_2];
//can do same w/ strings to arrays
const vowels = 'aeiou';
const vowels_arr = [...vowels];


//can spread objects as well, cannot iterate over objects, they are not iterable

const tea = {
    type: 'oolong',
    name: 'winter sprout',
    origin: 'taiwan'
};
//can use spread inside of a new object literal
const teaTin = {...tea, price: 22.99};

//be careful w/ conflicting properties, code below will overwrite the name property
const newTea = {...tea, name: 'golden frost'};
//if you spread an array into a new obj, it will make the properties be 
//1, 2, 3 and put the elements as the values

//creating copies of nested data structures ex: [{}, {}], if you use spread
//and edit, it will reference the same space in memory and you will edit
//both items simultaneously
//use libraries like lodash to make deep copies
//only use spread to make shallow clones, 1 layer deep

//Exercise!
/* Given this function:
function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
Refactor it to use the rest operator & an arrow function:
 Write an ES2015 Version */

const filterOutOdds = (...nums) => nums.filter(num => num % 2 ===0);

const findMin = (...nums) => nums.reduce((num, next_num) => Math.min(num, next_num));

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});


function doubleAndReturnArgs(arr, ...nums) {
    let arr_nums = nums.map(num => num*2);
    return [...arr, ...arr_nums];
};

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (items) => {
    let arr_in = [...items];
    let random = Math.floor(Math.random() * items.length);
    console.log(random);
    arr_in.splice(random, 1);
    return arr_in;
};

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => ({...obj, [key]: val});


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    let obj_copy = {...obj};
    delete obj_copy[key];
    return obj_copy;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({...obj1, ...obj2});


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
   let obj_copy = {...obj};
   obj_copy[key] = val;
   return obj_copy;
};
