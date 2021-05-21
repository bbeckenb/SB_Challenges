const teaOrder = {
    variety: 'oolong',
    teaName: 'winter sprout',
    origin: 'taiwan',
    price: 12.99,
    hasCaffeine: true,
    quantity: 3
};

//instead of grabbing data one at a time like 
//'const price = teaOrder.price', we can do so more efficiently as seen below:

//const { price, quantity, teaName } = teaOrder;
const {origin} = teaOrder;

//if the property is not in the object, it returns undefined
// can also use rest
const { price, quantity, teaName, ...others } = teaOrder;

//we can set a value if a property is not found
const { catdog = 175 } = teaOrder;

//can utilize this concept in functions
function checkout(tea) {
    const { quantity = 1, price } = tea; //sets quantity to 1 if it is not found
    return quantity * price;
}

//can accomplish this same thing in the arguments of a function

function checkout_2({quantity, price, ...others}) {
    return quantity * price;
}



//applies to arrays as well
const students = [
    { name: 'Drake', gpa: 4.6},
    { name: 'Henrietta', gpa: 4.4},
    { name: 'Tung', gpa: 4.0},
    { name: 'Harry', gpa: 3.8},
    { name: 'Ant', gpa: 3.2},
]
//all based off of positioning in the array, can skip elements as seen below
//const [ topStudent, secondBest, , fourth] = students;
//can apply this with rest/ spread
const [first, ...losers] = students;

//Destructuring Nested Objects

//destructuring swap
let delicious = 'Mayonnaise';
let disgusting = 'Whipped Cream';
// destructuring syntax to swap vals
[disgusting, delicious] = [delicious, disgusting];

//EXERCISE
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {num1Planets, yearNeptuneDiscovered} = facts;

console.log(num1Planets); // 8
console.log(yearNeptuneDiscovered); // 1846

let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
  let {numPlanets, ...discoveryYears} = planetFacts;
  
  console.log(discoveryYears); // returns an object {yearNeptuneDiscovered: 1846,  yearMarsDiscovered: 1659]
//_____________________________________________________________________
  function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }
  
  getUserData({firstName: "Alejandro", favoriteColor: "purple"}) 
  // `Your name is Alejandro and you like purple`
  getUserData({firstName: "Melissa"}) 
   // `Your name is Melissa and you like green`
  getUserData({}) 
  //`Your name is undefined and you like green`

let [first1, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first1); // Maya
console.log(second); // Marisa
console.log(third); // Chi

//_____________________________________________________________________

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]
  
  console.log(raindrops); // "Raindrops on roses"
  console.log(whiskers); // "whiskers on kittens"
  console.log(aFewOfMyFavoriteThings); // ["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]



let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [10, 30, 20]


var obj = {
  numbers: {
    a: 1,
    b: 2
  }
};
/*
var a = obj.numbers.a;
var b = obj.numbers.b;
*/
const { a, b } = obj.numbers;
console.log(a,b);

/*
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;
*/

const arr = [1,2]

let [c, d] = arr; //have to use let
[c, d] = [d, c];
console.log(c, d);

const raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest})



