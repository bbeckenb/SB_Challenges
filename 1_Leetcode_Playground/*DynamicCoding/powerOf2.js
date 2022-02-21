function powerOfTwo(num){
    let count = 0;
    let powerRes = 1;
    while (powerRes <= num) {
        powerRes = 2**count;
        if (powerRes == num) {
            return true;
        }
        count++;
    }
    return false
}