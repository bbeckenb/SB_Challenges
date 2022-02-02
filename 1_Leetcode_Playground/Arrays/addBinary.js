/**
 * Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
output: "100"
Example 2:

Input: a = "1010", b = "1011"
output: "10101"
 */

function addBinary(a, b) {
    let longArr;
    let shortArr;
    if(a.length >= b.length) {
        longArr = Array.from(a);
        shortArr = Array.from(b);
    } else {
        longArr = Array.from(b);
        shortArr = Array.from(a);
    }
    let shortArrCount = shortArr.length - 1;
    let carryOne = 0;
    let output = '';
    for(let i=longArr.length-1; i>=0; i--) {
        if(shortArrCount >= 0) {
            if(longArr[i] === '1' && shortArr[shortArrCount] === '1') {
                if(carryOne === 1) {
                    output = '1' + output;
                } else {
                    output = '0' + output;
                }
                carryOne = 1;
            } else if (longArr[i] === '0' && shortArr[shortArrCount] === '1') {
                if(carryOne === 1) {
                    output = '0' + output;
                    carryOne = 1;
                } else {
                    output = '1' + output;
                }
            } else if (longArr[i] === '1' && shortArr[shortArrCount] === '0') {
                if(carryOne === 1) {
                    output = '0' + output;
                    carryOne = 1;
                } else {
                    output = '1' + output;
                }
            } else if (longArr[i] === '0' && shortArr[shortArrCount] === '0') {
                if(carryOne === 1) {
                    output = '1' + output;
                    carryOne = 0;
                } else {
                    output = '0' + output;
                }
            }
        } else {
            if (longArr[i] === '1' && carryOne===1) {
                output = '0' + output;
            } else if (longArr[i] === '0' && carryOne===1) {
                output = '1' + output;
                carryOne=0;
            } else {
                output = longArr[i] + output;
            }
        }
        shortArrCount--;
    }
    if (carryOne===1) {
        output = '1' + output;
    }
    return output
}

addBinary('1', '11');


const addBinaryOtherUser = (a, b) => {
    const arrA = a.split("").reverse();
    const arrB = b.split("").reverse();
    let carry = 0;
    let answer = [];
    let idx = 0;
    const len = a.length > b.length ? a.length : b.length;
  
    while (idx < len) {
      const x = arrA[idx] ? +arrA[idx] : 0;
      const y = arrB[idx] ? +arrB[idx] : 0;
      const sum = carry + x + y;
      carry = Math.floor(sum / 2);
      answer.unshift(sum % 2);
      idx++;
    }
  
    if (carry > 0) answer.unshift(carry);
  
    return answer.join("");
  };