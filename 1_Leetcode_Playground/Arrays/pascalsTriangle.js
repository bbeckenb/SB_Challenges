function pascalsTriangleGen(numRows) {
    let outputArr = [[1]];
    for (let count=0; count<numRows-1; count++) {
        let currRow = outputArr[count];
        let buildRow = [];
        buildRow.push(currRow[0]);
        for (let i=1; i<currRow.length; i++) {
            let newElem = currRow[i] + currRow[i-1];
            buildRow.push(newElem);
        }
        buildRow.push(currRow[currRow.length-1]);
        outputArr.push(buildRow);
    }
    return outputArr
}

pascalsTriangleGen(5)

function zeroIndexedPascalsTriangleGen(rowIndex) {
    let outputArr = [[1]];
    for (let count=0; count<rowIndex; count++) {
        let currRow = outputArr[count];
        let buildRow = [];
        buildRow.push(currRow[0]);
        for (let i=1; i<currRow.length; i++) {
            let newElem = currRow[i] + currRow[i-1];
            buildRow.push(newElem);
        }
        buildRow.push(currRow[currRow.length-1]);
        outputArr.push(buildRow);
    }
    return outputArr
}

zeroIndexedPascalsTriangleGen(5)