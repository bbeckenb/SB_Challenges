/** product: calculate the product of an array of numbers. */

function product(nums) {
  //base case
  if (nums.length === 0) return 1;
  //normal case
  let n = nums.pop();
  return n * product(nums);
}

console.log(product([2, 3, 4]));
console.log(product([1, -1, 1, -1, 1, -1]));
console.log(product([10]));

/** longest: return the length of the longest word in an array of words. */

function longest(words, i=0, compare=0) {
  // base case
  if (i === words.length) return compare;
  //normal case
  let wordLength = words[i].length;
  if (wordLength > compare){
    return longest(words, i+1, wordLength);
  }
  else {
    return longest(words, i+1, compare);
  }
  
}

console.log(longest(["hello", "hi", "hola"]));
console.log(longest(["abcdefg", "hijklmnop", "qrs", "tuv", "wx", "y", "z"]));
console.log(longest(["a", "b", "c", "d", "e"]));
console.log(longest(["abcde"]));
/** everyOther: return a string with every other letter. */

function everyOther(str, i=0) {
  //base case
  if(i === str.length) return ''
  //normal case
  if (i%2 === 0) {
    return str[i] + everyOther(str, i+1);
  }
  else {
    return '' + everyOther(str, i+1);
  }
}

console.log(everyOther("hello"))
console.log(everyOther("banana stand"))
console.log(everyOther("ddoouubbllee"))
console.log(everyOther("hi"))
console.log(everyOther("z"))

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, p1=0, p2=str.length-1) {
  //base case
  if(p1 >= p2) return true;
  //normal case
  if(str[p1] !== str[p2]) {
    return false;
  }
  else {
    return isPalindrome(str, p1+1, p2-1);
  }
}
console.log('ispalindrome')
console.log(isPalindrome("tacocat"))
console.log(isPalindrome("racecar"))
console.log(isPalindrome("a"))
console.log(isPalindrome("helloolleh"))
console.log(isPalindrome("tacodog"))
console.log(isPalindrome("az"))
console.log(isPalindrome("goodbye"))

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, p1=0, p2=arr.length-1) {
  //base case
  if (p1>=p2) return -1;
  //normal case
  if (arr[p1] === val) {
    return p1;
  }
  else if (arr[p2] === val) {
    return arr.length - p2;
  }
  else {
    return findIndex(arr, val, p1+1, p2-1);
  }
}
console.log('findindex')
let animals = ["duck", "cat", "pony", "cat"];
console.log(findIndex(animals, "duck"))
console.log(findIndex(animals, "cat"))
console.log(findIndex(animals, "pony"))
console.log(findIndex(animals, "porcupine"))
console.log(findIndex(animals, "turtle"))
/** revString: return a copy of a string, but in reverse. */

function revString(str, p=str.length-1) {
//base case
  if (p < 0) return '';
  //normal case

  return str[p] + revString(str, p-1);
}
console.log(revString('porcupine'));
console.log(revString('duck'));
console.log(revString('cat'));
console.log(revString('pony'));

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, p=0, accum=[]) {

  // base case
  if(p === Object.keys(obj).length) return accum;
  //normal case
  if(typeof(obj[Object.keys(obj)[p]]) === 'string') {
    accum.push(obj[Object.keys(obj)[p]])
  }
  else if (typeof(obj[Object.keys(obj)[p]]) === 'object') {
    gatherStrings(obj[Object.keys(obj)[p]], 0, accum); 
  }
  return gatherStrings(obj, p+1, accum);

  // console.log(Object.keys(obj))
  // console.log(Object.keys(obj)[p])
  // console.log(obj[Object.keys(obj)[p]])
  // console.log(typeof(obj[Object.keys(obj)[p]]))
}

let nestedObj = {
  firstName: "Lester",
  favoriteNumber: 22,
  moreData: {
    lastName: "Testowitz"
  },
  funFacts: {
    moreStuff: {
      anotherNumber: 100,
      deeplyNestedString: {
        almostThere: {
          success: "you made it!"
        }
      }
    },
    favoriteString: "nice!"
  }
};

let whiskey = {
  name: "Whiskey",
  age: 5,
  favFood: "popcorn",
  color: "black",
  barks: false
};
console.log(gatherStrings(whiskey));
console.log(gatherStrings(nestedObj));


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, p1=0, p2=arr.length-1) {
//base case
if(p1>=p2) {
  if(arr[p2] === val) {
    return p2;
  }
  else return -1;
}

//normal case
let midPoint = Math.floor((p1 + p2)/2);
console.log(`mid ${arr[midPoint]}, p1 ${p1}, p2 ${p2}`);
if(arr[midPoint] === val) return midPoint;

else if (val < arr[midPoint]) {
  return binarySearch(arr, val, p1, arr[midPoint]-1);
}
return binarySearch(arr, val, arr[midPoint]+1, p2);
}

console.log(binarySearch([1, 2, 3, 4], 4));
console.log(binarySearch([1, 2], 1));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 7));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 6));
console.log(binarySearch([1, 2, 3, 4], 0));
console.log(binarySearch([1, 2], 11));


module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
