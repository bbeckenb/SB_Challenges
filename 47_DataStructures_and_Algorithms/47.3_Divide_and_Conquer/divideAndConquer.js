// General Tips
// When considering whether to use divide and conquer, make sure your data is properly structured!
// For example, if your array isn’t sorted, binary search won’t work
// If you can think of a linear solution quickly, can you use a divide and conquer approach to improve the complexity?
// Watch out for off by one errors! Managing the left / right pointers can be tricky.

//Linear Search
//Binary Search
//Sort algorithm
//if it is equal, GREAT!
//Check middle value, if it is too big, eliminate everything to the right
//if it is too small, eliminate everything to the left
//repeat until we find the target

function myBinarySearch(searchArr, target) {
    searchArr = searchArr.sort(function(a, b){return a-b});
    midPoint = Math.ceil(searchArr.length / 2);
    if (searchArr[midPoint] == target) {
        return console.log(midPoint);
    }
    else if (searchArr[midPoint] > target) {
        leftSide = searchArr.slice(0, midPoint);
        console.log(leftSide, midPoint);
        myBinarySearch(leftSide, target);
    }
    else if (searchArr[midPoint] < target) {
        rightSide = searchArr.slice(midPoint, -1);
        console.log(rightSide, midPoint);
        myBinarySearch(rightSide, target);
    }
    else return console.log(-1);
}
// O(log(n))
myBinarySearch([1,2,3,4,5,543,23,545,32,12323,56,6878,343476], 6878);

// Given a dataset, a divide and conquer algorithm removes a LARGE fraction of the dataset from consideration at each step
// Typically the dataset must have some additional structure (ex: be sorted)
// Significantly improves time complexity (O(n) -> O(log(n)))
// can't always use divide and conquer
//  other algorithms: merge-sort, discrete Fourier (for image/ sound compression)

// Quick Tips!
// properly structure data
//watch out for off by one errors when managing pointers

