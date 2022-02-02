function sqrtOofN(x) {
    for (i=0; i<=x; i++) {
        checkVal = i * i;
        if (i * i === x) {
            return i;
        } else if (i * i > x) {
            return i - 1;
        }
    }
}

function sqrtOofLogN(x) {
    let p1 = 0;
    let p2 = x;
    while(p1 <= p2) {
        let midPoint = Math.floor((p1 + p2)/2);
        if (midPoint * midPoint <= x && (midPoint+1) * (midPoint+1) > x) {
            return midPoint;
        } else if (midPoint * midPoint > x) {
            p2 = midPoint - 1;
        } else {
            p1 = midPoint + 1;
        }
    }
}