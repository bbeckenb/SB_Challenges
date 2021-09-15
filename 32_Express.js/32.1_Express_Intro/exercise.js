const ExpressError = require('./expressError')
const express = require('express');
const app = express();



app.use(express.urlencoded({ extended: true}));

app.get('/mean', (req, res) => {
    try {
        const { nums = '__error'} = req.query;
        if (nums === '__error') throw new ExpressError("nums are required", 400);
        console.log(typeof(nums));
        numsArr = nums.split(',').map(Number);
        if (numsArr.includes(NaN)) throw new ExpressError("query contained NaN, unsupported", 400);
        let returnVal = 0
        for (let i=0; i<numsArr.length; i++) {
            returnVal += numsArr[i];
        }
        returnVal = returnVal/numsArr.length
        res.json({response: 
                        {
                            operation: "mean",
                            value: returnVal
                        }
                    })
    } catch (e) {
        next(e)
    }
})

app.get('/median', (req, res) => {
    try {
        const { nums = '__error'} = req.query;
        if (nums === '__error') throw new ExpressError("nums are required", 400);
        console.log(typeof(nums));
        numsArr = nums.split(',').map(Number);
        if (numsArr.includes(NaN)) throw new ExpressError("query contained NaN, unsupported", 400);
        let returnVal = arr => {
            const mid = Math.floor(arr.length / 2),
              nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
          };
        res.json({response: 
                        {
                            operation: "median",
                            value: returnVal(numsArr)
                        }
                    })
    } catch (e) {
        next(e)
    }
})

function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    let modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
    return modes;
}

app.get('/mode', (req, res, next) => {
    try {
        const { nums = '__error'} = req.query;
        if (nums === '__error') throw new ExpressError("nums are required", 400);
        console.log(typeof(nums));
        numsArr = nums.split(',').map(Number);
        if (numsArr.includes(NaN)) throw new ExpressError("query contained NaN, unsupported", 400);
        let returnVal = mode(numsArr);
        res.json({response: 
                        {
                            operation: "mode",
                            value: returnVal
                        }
                    })
    } catch (e) {
        next(e)
    }
})

// express goes to this if an input url does not match any routes
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

// express identifies this as the error handler
app.use((err, req, res, next) => {
    let status = err.status || 404;
    let message = err.message
    return res.status(status).json({error: {message, status}})
})

app.listen(3000, function() {
    console.log('App on port 3000');
})