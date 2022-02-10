/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if(!this.head){
      this.push(val);
    }
    else {
      const newNode = new Node(val);
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
    
  }

  /** pop(): return & remove last item. */

  pop() {
    if(this.length === 0){
      throw 'Error: list is empty';
    }
    else if (this.length === 1){
      let poppedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return poppedNode.val;
    }
    else {
      let poppedNode = this.tail;
      let currentNode = this.head;
      let previousNode = currentNode;
      for (let node=0; node<this.length-1; node++){
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      this.length--;
      previousNode.next = null;
      this.tail = previousNode;
      return poppedNode.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if(this.length === 0){
      throw 'Error: list is empty';
    }
    else if (this.length === 1){
      let poppedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return poppedNode.val;
    }
    else {
      let poppedNode = this.head;
      let newHead = this.head.next;
      this.head = newHead;
      this.length--;
      return poppedNode.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(idx < this.length){
      let currentNode = this.head;
      for (let node=0; node<idx; node++){
        currentNode = currentNode.next;
      }
      return currentNode.val
    }
    else {
      throw 'Error: index out of range'
    }
  }

  /** getAt(idx): get node at idx. */
  getNode(idx) {
    if(idx < this.length){
      let currentNode = this.head;
      for (let node=0; node<idx; node++){
        currentNode = currentNode.next;
      }
      return currentNode
    }
    else {
      throw 'Error: index out of range'
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx < this.length){
      let currentNode = this.head;
      for (let node=0; node<idx; node++){
        currentNode = currentNode.next;
      }
      currentNode.val = val;
    }
    else {
      throw 'Error: index out of range'
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx===0){
      this.unshift(val);
    }
    else if (idx < this.length) {
      const leftNode = this.getNode(idx-1);
      const rightNode = this.getNode(idx);
      const newNode = new Node(val);

      leftNode.next = newNode;
      newNode.next = rightNode;
      // console.log(`left ${leftNode.val} ${leftNode.next.val} new ${newNode.val} ${newNode.next.val} right ${rightNode.val} ${rightNode.next.val}`)
      this.length++;
    }
    else if (idx === this.length) {
      this.push(val);
    }
    else {
      throw 'Error: index out of range';
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx===0){
      this.shift();
    }
    else if (idx < this.length-1) {
      const leftNode = this.getNode(idx-1);
      const rightNode = this.getNode(idx+1);
  
      leftNode.next = rightNode;
      // console.log(`left ${leftNode.val} ${leftNode.next.val} new ${newNode.val} ${newNode.next.val} right ${rightNode.val} ${rightNode.next.val}`)
      this.length--;
    }
    else if (idx === this.length-1) {
      this.pop();
    }
    else {
      throw 'Error: index out of range';
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.length===0){
      return 0
    }
    let sum = 0
    let currentNode = this.head
    for (let node = 0; node<this.length; node++){
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum/this.length;
  }
}

// module.exports = LinkedList;
console.log('PUSH');
let lst = new LinkedList();
lst.push(5);
console.log('lst.length',lst.length);
console.log('lst.head.val',lst.head.val);
console.log('lst.tail.val',lst.tail.val);
    // expect(lst.head.val).toBe(5);
    // expect(lst.tail.val).toBe(5);

lst.push(10);
console.log('lst.length',lst.length);
console.log('lst.head.val',lst.head.val);
console.log('lst.head.next.val',lst.head.next.val);
console.log('lst.tail.val',lst.tail.val);
    // expect(lst.length).toBe(2);
    // expect(lst.head.val).toBe(5);
    // expect(lst.head.next.val).toBe(10);
    // expect(lst.tail.val).toBe(10);

lst.push(15);
console.log('lst.length',lst.length);
console.log('lst.head.val',lst.head.val);
console.log('lst.head.next.next.val',lst.head.next.next.val);
console.log('lst.tail.val',lst.tail.val);
    // expect(lst.length).toBe(3);
    // expect(lst.head.val).toBe(5);
    // expect(lst.head.next.next.val).toBe(15);
    // expect(lst.tail.val).toBe(15);

console.log('UNSHIFT');
let lst1 = new LinkedList();

lst1.unshift(5);
console.log('lst1.length',lst1.length);
console.log('lst1.head.val',lst1.head.val);
console.log('lst1.tail.val',lst1.tail.val);
// expect(lst.length).toBe(1);
// expect(lst.head.val).toBe(5);
// expect(lst.tail.val).toBe(5);

lst1.unshift(10);
console.log('lst1.length',lst1.length);
console.log('lst1.head.val',lst1.head.val);
console.log('lst1.head.next.val',lst1.head.next.val);
console.log('lst1.tail.val',lst1.tail.val);
// expect(lst.length).toBe(2);
// expect(lst.head.val).toBe(10);
// expect(lst.head.next.val).toBe(5);
// expect(lst.tail.val).toBe(5);

lst1.unshift(15);
console.log('lst1.length',lst1.length);
console.log('lst1.head.val',lst1.head.val);
console.log('lst1.head.next.next.val',lst1.head.next.next.val);
console.log('lst1.tail.val',lst1.tail.val);
// expect(lst.length).toBe(3);
// expect(lst.head.val).toBe(15);
// expect(lst.head.next.next.val).toBe(5);
// expect(lst.tail.val).toBe(5);

console.log('POP');
let lst3 = new LinkedList([5,10]);

console.log('lst3.pop', lst3.pop());
console.log('lst3.head.val', lst3.head.val);
console.log('lst3.tail.val',lst3.tail.val);
console.log('lst3.length', lst3.length);
// expect(lst3.pop()).toBe(10);
// expect(lst3.head.val).toBe(5);
// expect(lst3.tail.val).toBe(5);
// expect(lst3.length).toBe(1);

console.log('lst3.pop', lst3.pop());
console.log(lst3);
console.log('lst3.head.val and lst3.tail.val are null')

console.log('lst3.length', lst3.length);
// expect(lst3.pop()).toBe(5);
// expect(lst3.tail).toBe(null);
// expect(lst3.head).toBe(null);
// expect(lst3.length).toBe(0);

// console.log('lst3.pop', lst3.pop());

console.log('SHIFT');
let lst4 = new LinkedList([5, 10]);

console.log('lst4.shift', lst4.shift());
console.log('lst4.head.val', lst4.head.val);
console.log('lst4.tail.val',lst4.tail.val);
console.log('lst4.length', lst4.length);
// expect(lst.shift()).toBe(5);
// expect(lst.tail.val).toBe(10);
// expect(lst.length).toBe(1);

console.log('lst4.shift', lst4.shift());
console.log(lst4);
console.log('lst4.head.val and lst4.tail.val are null')
// expect(lst4.shift()).toBe(10);
// expect(lst.tail).toBe(null);
// expect(lst.head).toBe(null);
// expect(lst.length).toBe(0);

console.log('GETAT');

let lst5 = new LinkedList([5, 10, 6, 7]);

console.log('lst5.getAt(0)', lst5.getAt(0));
console.log('lst5.getAt(1)', lst5.getAt(1));
console.log('lst5.getAt(2)', lst5.getAt(2));
console.log('lst5.getAt(3)', lst5.getAt(3));
// console.log('lst5.getAt(4)', lst5.getAt(4)); //throw error works
  // expect(lst.getAt(0)).toBe(5);
  // expect(lst.getAt(1)).toBe(10);

console.log('SETAT')
let lst6 = new LinkedList([5, 10]);

console.log('lst6.setAt(0, 1)', lst6.setAt(0, 1));
console.log('lst6.setAt(1, 2)', lst6.setAt(1, 2));
console.log('lst6.head.val)', lst6.head.val);
console.log('lst6.head.next.val', lst6.head.next.val);
    // expect(lst.setAt(0, 1));
    // expect(lst.setAt(1, 2));
    // expect(lst.head.val).toBe(1);
    // expect(lst.head.next.val).toBe(2);

console.log('INSERTAT')
let lst7 = new LinkedList([5, 10, 15, 20]);

console.log('lst7.insertAt(2, 12)', lst7.insertAt(2, 12));
console.log('lst7.length', lst7.length);
console.log('lst7.head.val', lst7.head.val);
console.log('lst7.head.next.val', lst7.head.next.val);
console.log('lst7.head.next.next.val))', lst7.head.next.next.val);
console.log('lst7.head.next.next.next.val', lst7.head.next.next.next.val);
console.log('lst7.head.next.next.next.next.val', lst7.head.next.next.next.next.val);

// lst.insertAt(2, 12);
// expect(lst.length).toBe(5);
// expect(lst.head.val).toBe(5);
// expect(lst.head.next.val).toBe(10);
// expect(lst.head.next.next.val).toBe(12);
// expect(lst.head.next.next.next.val).toBe(15);
// expect(lst.head.next.next.next.next.val).toBe(20);

console.log('lst7.insertAt(5, 25)', lst7.insertAt(5, 25));
console.log('lst7.head.next.next.next.next.next.val', lst7.head.next.next.next.next.next.val);
console.log('lst7.tail.val', lst7.tail.val);

// lst.insertAt(5, 25);
// expect(lst.head.next.next.next.next.next.val).toBe(25);
// expect(lst.tail.val).toBe(25);

console.log('REMOVEAT')
// lst7 = [5, 10, 12, 15, 20, 25]
console.log('lst7.removeAt(2)', lst7.removeAt(2));
console.log('lst7.length', lst7.length);
console.log('lst7.head.val', lst7.head.val);
console.log('lst7.head.next.val', lst7.head.next.val);
console.log('lst7.head.next.next.val))', lst7.head.next.next.val);
console.log('lst7.head.next.next.next.val', lst7.head.next.next.next.val);
console.log('lst7.head.next.next.next.next.val', lst7.head.next.next.next.next.val);

// lst.removeAt(2);
// expect(lst.length).toBe(5);
// expect(lst.head.val).toBe(5);
// expect(lst.head.next.val).toBe(10);
// expect(lst.head.next.next.val).toBe(15);
// expect(lst.head.next.next.next.val).toBe(20);
// expect(lst.head.next.next.next.next.val).toBe(25);
// lst7 = [5, 10, 15, 20, 25]
console.log('lst7.removeAt(4)', lst7.removeAt(4));
console.log('lst7.head.next.next.next.val', lst7.head.next.next.next.val);
console.log('lst7.tail.val', lst7.tail.val);
console.log('lst7.length', lst7.length);
// lst.removeAt(5, 25);
// expect(lst.head.next.next.next.val).toBe(20);
// expect(lst.tail.val).toBe(20);
// lst7 = [5, 10, 15, 20]
console.log('lst7.removeAt(0)', lst7.removeAt(0));
console.log('lst7.length', lst7.length); //2
console.log('lst7.head.val', lst7.head.val);//10
console.log('lst7.head.next.val', lst7.head.next.val);//15
console.log('lst7.head.next.next.val))', lst7.head.next.next.val);//20
console.log('lst7.tail.val', lst7.tail.val); //20

// console.log('lst7.removeAt(4)', lst7.removeAt(3)); //throw error works


console.log('AVERAGE')

let lst8 = new LinkedList([2, 3, 1, 1, 7, 6, 9]);

console.log('lst8.average()', lst8.average()); //4.1429

let lst9 = new LinkedList();
console.log('lst9.average()', lst9.average()); //0

module.exports = LinkedList;