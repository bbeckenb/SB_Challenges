/**
Runtime: 67 ms, faster than 88.52% of JavaScript online submissions for Climbing Stairs.
Memory Usage: 42 MB, less than 6.44% of JavaScript online submissions for Climbing Stairs.
 */

function stairStep(n) {
    let step = 0;
    let nextStep = 1;
    let outSum = 0;
    
    for (let i=0; i<n; i++) {
        outSum = step + nextStep;
        step = nextStep;
        nextStep = outSum;
    }
    return outSum;
}

stairStep(5)