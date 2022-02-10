/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newNode = new Node(val);
    if(!this.first){
      this.first = newNode;
      this.last = newNode;
    } 
    newNode.next = this.first;
    this.first = newNode;
    this.size++;
    }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if(this.size === 0) {
      throw 'error: cannot perform pop on empty stack'
    }
    else if(this.size === 1) {
      const nodeToPop = this.first;
      this.first = null;
      this.last = null;
      this.size = 0;
      return nodeToPop.val;
    }
    else {
      const nodeToPop = this.first;
      const newFirstNode = this.first.next;
      this.first = newFirstNode;
      this.size--;
      return nodeToPop.val
    }
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if(this.size === 0){
      return true
    }
    return false
  }
}

console.log('PUSH');
stack = new Stack();
console.log('stack.push(10)', stack.push(10));
console.log('stack.first.val', stack.first.val);
console.log('stack.last.val', stack.last.val);
console.log('stack.push(100)', stack.push(100));
console.log('stack.first.val', stack.first.val);
console.log('stack.last.val', stack.last.val);
console.log('stack.push(1000)', stack.push(1000));
console.log('stack.first.val', stack.first.val);
console.log('stack.last.val', stack.last.val);

// expect(stack.push(10)).toBe(undefined);
// expect(stack.first.val).toBe(10);
// expect(stack.last.val).toBe(10);
// stack.push(100);
// expect(stack.first.val).toBe(100);
// expect(stack.last.val).toBe(10);
// stack.push(1000);
// expect(stack.first.val).toBe(1000);
// expect(stack.last.val).toBe(10);

console.log('POP');
console.log('current stack', stack);
let removed = stack.pop();
console.log('popped element, should be 1000', removed);
console.log('stack size, should be 2', stack.size);
console.log('stack.pop()', stack.pop());
console.log('stack.pop()', stack.pop());
console.log('stack size, should be 0', stack.size);
// console.log('stack.pop() should return error', stack.pop()); //works

console.log('POP');
console.log('current stack', stack);
console.log('stack.push(3)', stack.push(3));
console.log('stack peek, should be 3', stack.peek());
console.log('stack.push(5)', stack.push(5));
console.log('stack peek, should be 5', stack.peek());

console.log('ISEMPTY')
console.log('current stack', stack);
console.log('is empty? should be false', stack.isEmpty());
console.log('stack.pop()', stack.pop());
console.log('stack.pop()', stack.pop());
console.log('is empty? should be true', stack.isEmpty());