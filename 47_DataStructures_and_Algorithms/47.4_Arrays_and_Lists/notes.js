// Lists - not a data type, abstract data type, 
// set of requirments that other data types may use

//Arrays in JS - how do they work?
//Traditionally, arrangement of items at equally-spaced addresses in memory
//Retrieving something by index (random access) is O(1)
//Insertion in general is O(n), need to shift everything over
//Deletion is O(n) as well

//Direct Array/ Vectors - direct arrays only work if all the same type as declared
// if you go over allotted spaces, you will overflow space allocated for element

//Indirect arrays
//The array doesn't directly hold the value, it holds the memory address of the real value
//This lets an array store different types of data, or different length data

//Linked Lists - aren't stored in contiguous memory
//Bunch of little nodes pointing to next node
//Have value and next (for last item that is null)

class Node {
    constructor(val, next=null) {
        this.val = val;
        this.next = next;
    }
}

// const firstPage = new Node('google.com');
// const secondPage = new Node('reddit.com');
// const thirdPage = new Node('amazon.com');

// firstPage.next = secondPage;
// secondPage.next = thirdPage;

// the above can be implemented as the following:

let firstPage = 
    new Node('google.com', 
        new Node('reddit.com', 
            new Node('amazon.com')));

// console.log(firstPage)

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    traverse() {
        let currentNode = this.head;
        while(currentNode) {
            console.log(currentNode.val);
            currentNode = currentNode.next;
        }
    }

    find(val) {
        let currentNode = this.head;
        while(currentNode) {
            if(currentNode.val === val) {
                console.log('true');
                return true;
            }
            currentNode = currentNode.next;
        }
    }

    append(val) {
        // let currentNode = this.head;
        // while(currentNode.next){
        //     currentNode = currentNode.next;
        // }
        // currentNode.next = new Node(val);
        const newNode = new Node(val);
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        }
        this.tail.next = newNode;
        this.tail = newNode;
    }
}

// const history = new LinkedList();
// history.head = firstPage;

// history.traverse();
// history.find('amazon.com');
// history.append('swimtrunks.com')
// history.traverse();
// history.find('swimtrunks.com');

//searching for things in LinkedLists
const train = new LinkedList();
train.append('engine_car');
train.append('engine_car2');
train.append('engine_car3');
train.traverse()
console.log(train);
// train.append('freight_car');
// train.append('caboose');
// train.traverse();
// train.find('freight_car');

