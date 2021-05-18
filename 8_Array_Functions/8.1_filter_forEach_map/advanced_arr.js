//if you add parentheses () you are executing function
//can store function in variables

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

const mathFuncs = [add, subtract];

function doMath(a,b,mathFunc) {
    return mathFunc(a,b);
}

console.log(doMath(7,5,subtract));

//forEach pass function as callback
//calls function for each element in an array

const colors = ['teal', 'cyan', 'peach', 'purple'];

colors.forEach(function(val) {
    console.log(val.toUpperCase());
});

const prices = [44.5, 89.7, 2.8, 95.3];
let total = 0;
prices.forEach(function(price) {
    total += price;
});
console.log(total);

//forEach existed because 'for of' didn't exist
function plus_5(x) {
    return x+5;
}

function myForEach(array, callback) {
    for(let i =0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

myForEach(colors, function(color, i) {
    console.log(color.toUpperCase(), 'at index of:', i);
});

//map - transforms old array and creates a new array of the same length
const links = Array.from(document.querySelectorAll('a'));
//pass something not iterable but array-like into Array.from()


const urls = links.map(function(a) {
    return a.href;
});
console.log(urls);

function myMap(array, callback) {
    let newArray = [];
    for(let i=0; i<array.length; i++) {
        newArray.push(callback(array[i], i, array));
    }
    return newArray;
}

let weener_dog = myMap(colors, function(a) {
    return a.toUpperCase();
})

//useful to utilize filter on array and then utilize map method on the outputted array
//example went through filtering checked box elements and using map to output checked items in a todo list

function doubleValues(arr){
    let new_array = [];
    arr.forEach(function(element) {
        let x = element*2;
        new_array.push(x);
    })
    return new_array;
};

function onlyEvenValues(arr){
    let new_array =[];
    arr.forEach(function(element) {
        if(element >= 0) {
            new_array.push(element);
        }
    })
    return new_array;
}

function showFirstAndLast(arr) {
    let new_array =[];
    arr.forEach(function(element) {
        let new_element = ''
        new_element = element[0] + element[-1];
        new_array.push(new_element);
        })
    
    return new_array;
}

function addKeyAndValue(arr,key,value){
    let new_array = [];
    arr.forEach(function(element) {
        element[key] = value;
        new_array.push(element);
        })
    return new_array;
} 

function vowelCount(str){
    let new_array = {};
    let arr = Array.from(str);
    arr.forEach(function(element) {
        let low_element = element.toLowerCase();
        if(low_element === 'a') {
            if('a' in new_array) {
                new_array['a'] += 1;
            }
            else {
                new_array['a'] = 0;
            } 
        }
        else if (low_element === 'e') {
            if('e' in new_array) {
                new_array['e'] += 1;
            }
            else {
                new_array['e'] = 0;
            }
        }
        else if (low_element === 'i') {
            if('i' in new_array) {
                new_array['i'] += 1;
            }
            else {
                new_array['i'] = 0;
            }
        }
        else if (low_element === 'o') {
            if('o' in new_array) {
                new_array['o'] += 1;
            }
            else {
                new_array['o'] = 0;
            }
        }
        else if (low_element === 'u') {
            if('u' in new_array) {
                new_array['u'] += 1;
            }
            else {
                new_array['u'] = 0;
            }
        }
        })
    return new_array;
};

function doubleValuesWithMap(arr) {
    return arr.map(function(elem) {
        return elem * 2;
    });
}

function findInObj(arr, key, searchValue) {
    let check = arr.filter(function(elem) {
        if(elem[key] === searchValue) {
        return elem;
        }
        });
        if(check.length > 0) {
            return check[0];
        }
        else {
            return undefined;
        }
}

function removeVowels(str) {
    let holder = Array.from(str.toLowerCase());
    let out_array = holder.filter(function(e) {
        return e.replace(/[aeiou]/g, '');
    })
    let out_word = '';
    for (let letter of out_array) {
        out_word += letter;
    }
    return out_word;
}

//some, checks if any elements of an array meet criteria

function mySome(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if(callback(arr[i], i, arr)) return true;
    }
    return false;
}

mySome([4,5,6,7], function(n) {
    return n > 5;
})

function myEvery(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if(!callback(arr[i], i, arr)) return false;
    }
    return true;
}

myEvery([4,5,6,7], function(n) {
    return Number.isInteger(n);
})