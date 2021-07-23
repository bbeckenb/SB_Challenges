function bubbleSort(arr) {
    for(let i=0; i<arr.length; i++) {
        let swapMade = false
        for(let j=0; j<arr.length-i; j++) {
            let temp = arr[j+1];
            if(arr[j] > arr[j+1]) {
                swapMade = true;
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
        if(!swapMade) break;
    }
    return arr;
}

module.exports = bubbleSort;

console.log(bubbleSort([4, 20, 12, 10, 7, 9]));
console.log(bubbleSort([0, -10, 7, 4]));
console.log(bubbleSort([1, 2, 3]));
console.log(bubbleSort([]));
let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34,
    23, 2, 453, 546, 75, 67, 4342, 32
];
console.log(bubbleSort(nums));