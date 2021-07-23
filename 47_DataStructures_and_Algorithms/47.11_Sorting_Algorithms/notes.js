/**
 * Sorting Algorithms
 *      There are trade-offs to different sorting algos
 *      Dependent on inputs
 * 
 * Sorting algorithms animations website
 * 
 * BUBBLE SORT
 *  comparisons
 *  compare one element to the next, then swap if one to left if larger
 */

function bubbleSort(arr) {
    let count = 0;
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length; j++) {
            count++;
            if(arr[i] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
            console.log(arr);
        }
    }
    console.log('TOTAL COUNT', count);
    return arr;
}
//need to iterate through smaller piece of array each time

function bubbleSort2(arr) {
    let count = 0;
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length-i; j++) {
        if(arr[i] > arr[j+1]) {
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
        console.log(arr);
        }
    }
    console.log('TOTAL COUNT', count);
    return arr;
}

//checks if we swapped anything in the last iteration, stops if we didn't
function bubbleSort3(arr) {
    let count = 0;
    for(let i=0; i<arr.length; i++) {
        let swapped = false
        for(let j=0; j<arr.length-i; j++) {
            count++;
        if(arr[i] > arr[j+1]) {
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
            swapped = true;
        }
        console.log(arr);
        }
        if(!swapped) break;
    }
    console.log('TOTAL COUNT', count);
    return arr;
}

//Bubble sort is O(n^2) (quadratic) in worst case (reversed array)

//There is a proof that no sorting algorithm will ever be able to be faster than O(log(n))

/**
 * Merge Sort 
 *      Merge arrays that are sorted
 *      Break array down into a small sorted arrays
 *      Then combine fragments
 * Merge Array Pseudo Code
 *      Create Empty out array
 *      Start pointers at beginnings of arrays a and b
 *          If a value <=b value, push a value out and increase pointer a
 *          Else, push b value to out and increase pointer b
 */

function merge(arr1, arr2) {
    const results = [];
    let i = 0;
    let j = 0;
    while(i< arr1.length && j< arr2.length) {
        if (arr1[i] < arr2[j]) {
            results.push(arr[i]);
            i++;
        } else {
            results.push(arr2[j]);
            j++;
        }
    }
    while(i< arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
}

function mergeSort(arr) {
    //base case
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

// Adaptive sorting algo 'TimSort' chooses mergesort or insertsort based on what will be more performant based on data
//Best comparative sort time-complexity is O(n*log(n))
//Sorting in JS
        // How to use .sort() method
        // JS sorting is lexicographic (not numeric) by default
        // how to write a comparator function
        // implementing merge sort, insertion sort, quicksort