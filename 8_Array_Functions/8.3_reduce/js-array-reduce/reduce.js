/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']

    extractValue([
      { name: "Elie" },
      { name: "Tim" },
      { name: "Matt" },
      { name: "Colt" }
    ], 'name');
*/

function extractValue(arr, key) {
    let new_array = [];
    let arr_out = arr.reduce(function(new_array, nextVal) {
       new_array.push(nextVal[key])
       return new_array;
    }, new_array);
    return arr_out;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str) {
    let new_word= Array.from(str);
    let new_obj = {};
    let obj_out = new_word.reduce(function(new_obj, element) {
        let low_element = element.toLowerCase();
        if(low_element === 'a') {
            if('a' in new_obj) {
                new_obj['a'] += 1;
            }
            else {
                new_obj['a'] = 1;
            } 
        }
        else if (low_element === 'e') {
            if('e' in new_obj) {
                new_obj['e'] += 1;
            }
            else {
                new_obj['e'] = 1;
            }
        }
        else if (low_element === 'i') {
            if('i' in new_obj) {
                new_obj['i'] += 1;
            }
            else {
                new_obj['i'] = 1;
            }
        }
        else if (low_element === 'o') {
            if('o' in new_obj) {
                new_obj['o'] += 1;
            }
            else {
                new_obj['o'] = 1;
            }
        }
        else if (low_element === 'u') {
            if('u' in new_obj) {
                new_obj['u'] += 1;
            }
            else {
                new_obj['u'] = 1;
            }
        }    
        return new_obj;
    }, new_obj)
    return obj_out;
}

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    addKeyAndValue(arr, 'title', 'Instructor') // 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value) {
    let new_arr = [];
    let arr_out = arr.reduce(function(arr_of_obj, element, index) {
        element[key] = value;
        arr_of_obj.push(element);
        return arr_of_obj;
    }, new_arr);
    return arr_out;
}

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
    
    function isEven(val){
        return val % 2 === 0;
    }
    
    const arr = [1,2,3,4,5,6,7,8];
    
    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    const names = ['Elie', 'Colt', 'Tim', 'Matt'];
    
    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, callback) {
    let arr_true = [];
    let arr_false = [];
    let arr_container = [];
    arr_container[0] = arr_true;
    arr_container[1] = arr_false;
    let arr_output = arr.reduce(function(arr_container, element) {
        if(callback(element) === true) {
            arr_container[0].push(element);
        }
        else {
            arr_container[1].push(element);
        }
        return arr_container;
    }, arr_container);
    return arr_output;
}
