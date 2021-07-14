/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const newNode = new Node(val)
    if(!this.first) {
      this.first = newNode;
      this.last = newNode;
    }
    this.last.next = newNode;
    this.last = newNode;
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if(this.size === 0){
      throw 'Error: this method cannot be performed on an empty queue';
    }
    else if (this.size === 1){
      const dequeuedNode = this.first;
      this.first = null;
      this.last = null;
      this.size = 0;
      return dequeuedNode.val
    }
    else {
      const dequeuedNode = this.first;
      this.first = dequeuedNode.next;
      this.size--;
      return dequeuedNode.val
    }
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if(this.first) {
      return this.first.val
    }
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if(this.size === 0){
      return true
    }
    return false
  }
}

// module.exports = Queue;
console.log('ENQUEUE');
queue = new Queue();
console.log('queue.enqueue(10)', queue.enqueue(10));
console.log('queue.first.val', queue.first.val);
console.log('queue.last.val', queue.last.val);
console.log('queue.enqueue(100)', queue.enqueue(100));
console.log('queue.first.val', queue.first.val);
console.log('queue.last.val', queue.last.val);
console.log('queue.enqueue(1000)', queue.enqueue(1000));
console.log('queue.first.val', queue.first.val);
console.log('queue.last.val', queue.last.val);

// expect(queue.enqueue(10)).toBe(undefined);
// expect(queue.first.val).toBe(10);
// expect(queue.last.val).toBe(10);
// queue.enqueue(100);
// expect(queue.first.val).toBe(10);
// expect(queue.last.val).toBe(100);
// queue.enqueue(1000);
// expect(queue.first.val).toBe(10);
// expect(queue.last.val).toBe(1000);

console.log('DEQUEUE');
console.log('current queue', queue);
let removed = queue.dequeue();
console.log('removed element', removed);
console.log('queue size should be 2', queue.size);
console.log('dequeue elem should be 100', queue.dequeue());
console.log('dequeue elem should be 1000', queue.dequeue());
console.log('queue size should be 0', queue.size);
// console.log('dequeue elem should throw error', queue.dequeue()); //works

// queue.enqueue(10);
// queue.enqueue(100);
// queue.enqueue(1000);
// let removed = queue.dequeue();
// expect(removed).toBe(10);
// expect(queue.size).toBe(2);
// queue.dequeue();
// queue.dequeue();
// expect(queue.size).toBe(0);
// });

console.log('PEEK');
console.log('current queue', queue);
console.log('peek of empty queue', queue.peek()); //should this return the null?
console.log('queue.enqueue(3)', queue.enqueue(3));
console.log('peek of queue w/ one node', queue.peek());
console.log('queue.enqueue(5)', queue.enqueue(5));
console.log('peek of queue w/ two nodes', queue.peek());

// describe("peek", function() {
//   it("returns the value at the start of the queue", function() {
//     queue.enqueue(3);
//     expect(queue.peek()).toBe(3);
//     queue.enqueue(5);
//     expect(queue.peek()).toBe(3);
//   });
// });

console.log('ISEMPTY');
console.log('current queue', queue);
console.log('isempty? should not be', queue.isEmpty())
console.log('dequeue elem should be 3', queue.dequeue());
console.log('dequeue elem should be 5', queue.dequeue());
console.log('isempty? should be', queue.isEmpty())

// describe("isEmpty", function() {
//   it("returns true for empty queues", function() {
//     expect(queue.isEmpty()).toBe(true);
//   });

//   it("returns false for nonempty queues", function() {
//     queue.enqueue(3);
//     expect(queue.isEmpty()).toBe(false);
//   });
// });