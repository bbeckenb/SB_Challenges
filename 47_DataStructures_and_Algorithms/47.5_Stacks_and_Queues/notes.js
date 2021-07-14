/*
Queue
Add at end, remove from beginning
-Items are only 'enqueued' at the back
-Items are only 'dequeued' at the front
-new at back, old at front FIFO structure

*/

class Queue {
    constructor() {
        this.data = [];
    }
    enqueue(val){
        this.data.push(val);
    }
    dequeue(val){
        return this.data.shift();
    }
}

//^^^Not optimal to remove from the front, the shift is O(n), something w/ millions of datapoints will be SLOW
 /*
 These Queue and Stack Classes should be extremely fast at a 
 limited set of operations.
 What is good to implement queues?
 -Array is bad, dequeueing is O(n)
 -Linked List, yes - enqueue and dequeue are both O(1)!
 -Doubly Linked Lists, yes - enqueue and dequeue are both O(1)!
 -Object: no :( dequeueing is O(n) have to scan whole obj to find low key 
 
 Stacks - whatever is added in last is going out first (call stack is a good analogy or pancakes)
 -Like function calls, allow us to return to some previous state
 -LIFO
 Typical methods
 -push(item) add to "top" of stack
 -pop() remove and return top item
 -peek() return (but don't remove) top item
 -isEmpty() are there items in the stack?
 Data-Structures Good for Stacks
 -Array is good, push and pop are both O(1)
 -Linked List is good! both push and pop are O(1)
 -Doubly linked list is good! push and pop are O(1)
 -Object is BAD, popping is O(n)

 Dequeues (double-ended queue, pronounced "deck")
 -Can add to end remove from front
 -Can be added to the front removed from back
 -common-methods: push, pop, shift, unshift
 -appendleft() add to beginning
 -appendright() add to end
 -popleft() remove and return from beginning
 -popright() remove and return from the end
 -peekleft() return (don't remove) beginning
 -peekright() return (don't remove) end
 isempty() any items in deque?
Data-Structures Good for Deques
 -Array is bad, push and pop are both O(n)
 -Linked List is good! both push and pop are O(1)
 -Doubly linked list is good! push and pop are O(1)
 -Object is BAD, appendleft() and popleft() are O(n)
 -linked list is bad, popright is O(n)
 -Doubly linked list, YES everything is O(1)

 Priority Queue
 -specify a priority w/ value
 -when we pop an element, we pop the highest priority
 -like a hospital patient priority ranking system
 Implementation Strategies
 1. Keep unsorted, add to end, find top priority
 2. Keep sorted, add at right place, top priority first
 DataStructures good for Priority Queue
    -We need to learn about a 'Heap'
 */

class PriorityQueue {
    constructor() {
        this.data = [];
    }
    add(priority, value) {
        this.data.push({priority, value})
    }
    poll() {
        let maxIdx = 0;
        letmaxPriority = this.data[0].priority;
        for(let i=1; i< this.data.length; i++){
            if(this.data[i].priority > maxPriority){
                maxPriority = this.data[i].priority;
                maxIdx = i;
            }
        }
        return this.data.splice(maxIdx, 1)[0].value;
    }
}


