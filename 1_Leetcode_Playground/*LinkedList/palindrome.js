const isPalindrome = function(head) {
    storageArr = [];
    currNode = head;
    while (currNode) {
        storageArr.push(currNode.val);
        currNode = currNode.next;
    }
    let p1 = 0;
    let p2 = storageArr.length - 1;
    while (p1 < p2) {
        if (storageArr[p1] !== storageArr[p2]) {
            return false
        }
        p1++;
        p2--;
    }
    return true
};