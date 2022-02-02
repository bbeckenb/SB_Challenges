function solution(N) {
    let binRep = Number(N).toString(2);
    let arrBinRep = Array.from(binRep);
    
    let storedCount = 0;
    let activeCount = 0;

    for(let i=0; i<arrBinRep.length; i++) {
        if(arrBinRep[i] === '0') {
            activeCount += 1;
        } else {
            storedCount = Math.max(storedCount, activeCount);
            activeCount = 0;
        }
    }
    console.log(storedCount, arrBinRep);
    return storedCount;
}

solution(2091234567)