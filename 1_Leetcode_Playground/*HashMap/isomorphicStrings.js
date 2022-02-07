function isoString(s,t) {
    if (s.length === 1 && t.length === 1) return true;
    if(s.length !== t.length) return false;
    let letterMap = {};
    for (let i=0; i<s.length; i++) {
        if (!letterMap[s[i]]) {
            if (Object.values(letterMap).includes(t[i])) return false;
            letterMap[s[i]] = t[i];
        } else {
            if (letterMap[s[i]] !== t[i]) return false
        }
    }
    return true;
}