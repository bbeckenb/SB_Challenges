//Usede to only have objs and arrs, now we have maps and sets
//maps let you make a key value data store, will not convert your 
//values to strings like in objs/ arrays
//have to call it as new Map();

const myMap = new Map();
myMap.set(7, 'seven');
myMap.set('7', 'seven string');
myMap.get(7);

//if you store an empty array it will give you 
//undefined when you 'get' it
//you have to create a reference to grab objects

const add = (x,y) => x+y;
const mult = (x,y) => x*y;

const funcCalls = new Map();
funcCalls.set(add, 0);
funcCalls.set(mult, 0);
//can store key value pairs in individual 
//arrays inside a larger array to initialize a map
const bandData = [[3, "3 doors down"], 
['three', 'three dog night'], ['nine', 'nine inch nails'], 
['four', 'the four seasons'], [41, 'sum 41']];

//can assign the kvp array into the declared map
const bandMap = new Map(bandData);

//can unpack map into larger array using rest
console.log([...bandMap]);

//can add new values
bandMap.set(182, 'blink 182')

//can see if a map has a certain value returns T or F
bandMap.has(3);

//can check size
bandMap.size

//forEach
bandMap.forEach((val, key) => {
    console.log(key + '=>' + val);
});

//can do destructuring in for loops iterating on maps
for (let [key, value] of bandMap) {
    console.log(key, '=', value);
}

//sets

const bandHashTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);

//sets only consist of unique values
//will iterate over strings as array like objects

bandHashTags.add('bestlife').add('selfie');

function filterHashTags(tags) {
    const bannedHasTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);
    return tags.filter((tag) => !bandHashTags.has(tag))
}

//use a set for efficiency in dealing with large datasets (>1000)
//can pass arrays into new sets, will strip out duplicates
const ages = [1,2,3,4,5,6,7, 7, 7,8,9,10];
const age_set = new Set(ages);

//can return the set to being an array, returns all unique values
const bob = [...new Set(ages)];

const billy = new Set([1,1,2,2,3,4]) //returns (1,2,3,4)

const jean = [...new Set("referee")].join("") //returns ref

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
//key of [1,2,3] val of true, key of [1,2,3] val of false

const hasDuplicate = arr => {
    const beans = new Set(arr);
    return beans.size < arr.length;
}
let vowels = Array.from('aeiou');

const vowelCount = word => {
    let vowel_map = new Map();
    let word_arr =  Array.from(word);
    let vowels = Array.from('aeiou');
        word_arr.forEach(function(letter_up) {
            let letter = letter_up.toLowerCase();
            if ('aeiou'.includes(letter)) {
                if(vowel_map.has(letter)) {
                    let count = vowel_map.get(letter);
                    count += 1;
                    vowel_map.set(letter, count);
                }
                else {
                    vowel_map.set(letter, 1);
                }
            }    
    })
    return vowel_map;
}