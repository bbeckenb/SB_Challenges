//This
//a JS method is a property of an obj that contains a function
//a function is a block of code written to perform specific tasks
//JS does not really have 'functions' by this definition, they are
//actually methods on the global object (window obj)
//ex: alert can be called as window.alert('text');

//short-hand rule of 'this', it will refer to what is on the left side of the period
//myObj.func();
//window.whatIsThis();

//NOTE: window has a name property => window.name = "";
//NOTE: when working with a class, it implements a "'use strict';" line
//it will make this be undefined if it does not reference the parent class

const blue = {
    name : 'blue',
    breed: 'scottish fold',
    dance : function(dance) {
        console.log('this is:', this);
        console.log(`Meow I am a ${this.breed} and I like to ${dance}`);

    },
    play(...toys) {
        for (let toy of toys) {
            console.log(`${this.name} plays with ${toy}`);
        }
    }
};



//Methods to change the value of this:
//can use call to call a function on an object, specify what 'this' should be

const blueDance = blue.dance;
blueDance.call(blue, 'jitterbug');

const dog = {
    breed   : 'Mini Aussie',
    name    : 'Tyson',
    dance   : blueDance
};
//one-time edit of how a method is called and executed
blueDance.call(dog, 'tango');

//bind does not call function, returns a new perma-bound function
const boundDance = blueDance.bind(blue); //value of 'this' is permanently bound

//binding arguments
const playsWithSocks = blue.play.bind(blue, 'left sock', 'right sock');

//can make a function constructor w/ bind and null for 'this' tying arg
function applySalesTax(taxRate, price) {
    return price + price * taxRate;
}

const applyCATax = applySalesTax.bind(null, .0725);
const applyTXTax = applySalesTax.bind(null, .0625);

//can build on this to pre-tie this to an object and build new function

const bobMembership = {
    name : 'Bob',
    total : 250
};

const jillMembership = {
    name : 'Jill',
    total : 375
};

function collectMonthlyFee(fee) {
    const remaining = this.total - fee;
    this.total = remaining;
    return this.name + 'remaining balance:' + remaining;
}

const collectBobsFee = collectMonthlyFee.bind(bobMembership, 10);
const collectJillsFee = collectMonthlyFee.bind(jillMembership, 20);

//can bind 'this' object to event listeners
const btnA = document.querySelector('#a');
const btnB = document.querySelector('#b');
const btnC = document.querySelector('#c');

//instead of adding event listeners logic for each we can use bind
function popUp(msg) {
    alert('Secret message is ' + msg);
}
btnA.addEventListener('click', popUp.bind(null, 'Button A says Hi'));
btnB.addEventListener('click', popUp.bind(null, 'Button B says Hi'));
btnC.addEventListener('click', popUp.bind(null, 'Button C says Hi'));

//Arrow functions and 'this', arrow functions do not make their own 'this'
const greeter = {
    msg : 'I like chikenz',
    sayHi : () => {
        alert(this.msg);
    },
    // waitAndGreet : function(delay) {
    //     console.log(this);
    //     let callback = function() {
    //         console.log(this);
    //         alert(this.msg);
    //     }
    //     setTimeout(callback.bind(this) ,delay);
    // }
    waitAndGreet : function(delay) {
        setTimeout(() => {
                alert(this.msg);
            },delay);
    }
};