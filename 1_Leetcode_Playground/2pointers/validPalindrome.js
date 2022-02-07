function validPalindrome(s) {
    const regex = /[^a-z]/g;
    let cleanS = s.replace(regex, '').toLowercase();
    for (let i=0; i<cleanS.length; i++) {
        if(cleanS[i] !== cleanS[cleanS.length-1-i]) return false
    }
    return true
}