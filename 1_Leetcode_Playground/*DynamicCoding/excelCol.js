function excelCol(columnNumber) {
    let letterObj = {};
    const charArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for (i=0; i<charArr.length; i++) {
        letterObj[i+1] = charArr[i];
    }
    let outputCol = '';
    let letterVal
    while(columnNumber > 0) {
        if (columnNumber > 26) {
            letterVal = columnNumber%26;
            if (letterVal === 0) {
                letterVal = 26;
                columnNumber -= 1;
            }
            columnNumber = Math.floor(columnNumber/26);
        } else {
            letterVal = columnNumber;
            columnNumber = 0;
        }
        outputCol = letterObj[letterVal] + outputCol;
    }
    return outputCol;
}

excelCol(52);