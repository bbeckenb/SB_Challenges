/* When You Would Use Reduce
It works for almost everything, but is sometimes overkill
When you want to transform an array into another data structure
Recap
reduce returns an accumulated value which is determined by the result of 
what is returned to each callback
reduce begins with the first value in the array or with an optional second 
argument for the starting value
*/
const midtermscores = [70,80,93,94,64,62,56];
const minscore = midtermscores.reduce(function(min, nextscore) {
    if(nextscore < min) {
        return nextscore;
    }
    return min;
});

console.log(midtermscores);