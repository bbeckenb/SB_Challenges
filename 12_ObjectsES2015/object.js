//const hypotenuse = (a,b) => Math.sqrt(a**2 + b**2);

//Below is the standard manual way of updating values, but it is inefficient
// let side1 = 4;
// let side2 = 3;
// const side3 = hypotenuse(side1, side2);

// side1 = 9;
// side2 = 12;

//'this' references object
// const rightTriangle = {
//     a               : 9,
//     b               : 12,
//     printThis() {
//         console.log(this);
//     },
//     getArea() {
//         return this.a * this.b / 2;
//     },
//     getHypotenuse() {
//         this.printThis();
//         return Math.sqrt(this.a ** 2 + this.b **2);
//     }
// };

//goal is to make a constructor function, 
//a scalable pattern to build new objects
//Use capital front letter to declare it is a constructor function
// function Triangle(a,b) {
//     this.a = a;
//     this.b = b;
//     this.getArea  = function() {
//         return this.a * this.b /2;
//     };
//     this.getHypotenuse = function() {
//         return Math.sqrt(this.a**2 + this.b **2);
//     };
// }
//prototype is an object that usually contains methods __proto__ property
//references prototype object, store functionality
//don't change built-in prototypes

// function Triangle(a,b) {
//     this.a = a;
//     this.b = b;
// }
// Triangle.prototype.getArea = function() {
//     return this.a * this.b /2;
// };
// Triangle.prototype.getHypotenuse = function() {
//     return Math.sqrt(this.a**2 + this.b **2);
// };

//instead of having to distinguish between values and methods, the above way
//using prototype, we should use classes to more efficiently and
//cleanly house the contents

//when you call 'new' it creates a blank object for us
// const t1 = new Triangle(3,4);
// const t2 = new Triangle(6,8);

//Classes are 'blueprints' for functionality
//Add methods to classes then creat instances of these classes
//Use capital letter to instantiate class, 
//put 'class' in front of it then use curly braces

class Triangle {
    constructor(a,b,c) {
        for(let side of [a,b,c]) {
            if(!Number.isFinite(side) || side<=0) {
                throw new Error('Sides must be positive numbers!');
            }
        }
        this.a = a; //'this' is for instances and being able to pass unique values to each instance
        this.b = b;
        this.c = c;
    }
    greet() {
        console.log('Hallo I am TRIANGLE');
    }
    display() {
        return `Tri with sides of ${this.a} and ${this.b}, and ${this.c}`;
    }
//Methods - call something a method when it is a property on an object
    getArea() {
        const { a, b, c } = this; //destructuring from instance input
        const s = (a+b+c) / 2;
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }
    isBig() {
        return this.getArea() > 50;
    }
}

//Create an instance of class triangle 'const NAME = new CLASS();'
const firstTri = new Triangle(4,6,8);
//can manually pass in values for variables


//Use constructors (purple tag in class)
//to pass vals into instance of class
//use 'this' keyword to to vars in constructor to methods in class

//Extends is used to build ontop of an existing class while allowing both to coexist
//will have the methods of the parent class, if you overwrite in
//extended class, it will find the function in the extended class
//first
class RightTriangle extends Triangle {
    constructor(a,b,c) {
    if (a**2 + b**2 !== c**2) {
        throw new Error('Improper hypotenuse!')
    }
    super(a,b,c); //'super' calls the 'constructor' of the parent
    }
    display() {
        return 'Right' + ' ' + super.display();
    }
}

//EXERCISE 12.1____________________________________________________________
//P1 
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return 'Beep.';
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
}

const myCar = new Vehicle('Ford', 'Taurus', 2014);

//P2
class Car extends Vehicle {
   constructor(a,b,c, numWheels) {
        super(a,b,c);   //have to call super() before you can call 'this'
        this.numWheels = 4;
        
   } 
}

const myVehicle = new Car('Blorp', 'SpaceCar', 3080);

//P3

class Motorcycle extends Vehicle {
    constructor(a,b,c, numWheels) {
        super(a,b,c);
        this.numWheels = 2;
    }
    revEngine() {
        return 'VROOM';
    }
}

const myMotorcycle = new Motorcycle('Dream', 'DNE', 29);

//P4
class Garage {
    constructor(capacity, vehicles) {
        this.vehicles = [];
        this.capacity = capacity;
    }
    add(new_vehicle) {
        if (new_vehicle instanceof Vehicle) {
            if (this.vehicles.length < this.capacity) {
                this.vehicles.push(new_vehicle);
                return "Vehicle added!"
            }
            else {
                return "Sorry, we're full!";
            }
        }
        else {
            return "Only vehicles are allowed in here!";
        }
    }
}

const myGarage = new Garage(1);