const LinkedList = require('../../47_DataStructures_and_Algorithms/47.4_Arrays_and_Lists/dsa-arrays-linked-lists/linked-list');

function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
}

let l1 = new ListNode(-9)
let l2 = new ListNode(3);
let l3 = new ListNode(5);
let l4 = new ListNode(7)

let list1 = l1
list1.next = l2
let list2 = l3
list2.next = l4

const mergeTwoLists = function(list1, list2) {
    let currNode1 = list1;
    let currNode2 = list2;
    let listOut = new ListNode();
    let head = listOut;
    while (currNode1 !== null && currNode2 !==null) {
        if (currNode1.val <= currNode2.val) {
            listOut.next = new ListNode(currNode1.val);
            currNode1 = currNode1.next;
        } else {
            listOut.next = new ListNode(currNode2.val);
            currNode2 = currNode2.next;
        }
        listOut = listOut.next;
    }
    while (currNode1) {
        listOut.next = new ListNode(currNode1.val);
        currNode1 = currNode1.next;
        listOut = listOut.next;
    }
    while (currNode2) {
        listOut.next = new ListNode(currNode2.val);
        currNode2 = currNode2.next;
        listOut = listOut.next;
    }
    return head.next
};

console.log(mergeTwoLists(list1,list2));