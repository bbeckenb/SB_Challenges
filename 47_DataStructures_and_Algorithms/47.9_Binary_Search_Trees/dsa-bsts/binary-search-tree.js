class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class QueueNode {
  constructor(btsNode=null, next=null) {
    this.btsNode = btsNode;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
        const newNode = new QueueNode(val);
        if(!this.first) {
          this.first = newNode;
          this.last = newNode;
        }
        this.last.next = newNode;
        this.last = newNode;
        this.size++;
  }
  
  dequeue() {
    if(this.size === 0) {
      throw 'Method cannot be performed on empty queue';
    } else if (this.size === 1) {
        const nodeToPop = this.first;
        this.first = null;
        this.last = null;
        this.size = 0;
        return nodeToPop.btsNode;
    } else {
        const nodeToPop = this.first;
        this.first = nodeToPop.next
        this.size--;
        return nodeToPop.btsNode;
    }
  }

  isEmpty() {
    if(this.size === 0) {
        return true;
    } else {
        return false;
    }
  }

}


class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let currentNode = this.root;
    if(!currentNode) {
      this.root = new Node(val);
      return this.root;
    }
    while(currentNode) {
      if(val < currentNode.val) {
        if(!currentNode.left) {
          currentNode.left = new Node(val);
          currentNode = currentNode.left.left;
        } else {
          currentNode = currentNode.left;
        }
      }
      else if (val === currentNode.val) {
        return this.root;
      }
      else {
        if(!currentNode.right) {
          currentNode.right = new Node(val);
          currentNode = currentNode.right.right;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return this.root;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if(!this.root) {
      this.root = new Node(val)
      return this.root;
    }

    function insRecurHelper(val, node) {
      //base case
      if(!node) return;
       //normal case
      if(val < node.val) {
        if(!node.left) {
          node.left = new Node(val);
          return insRecurHelper(val, node.left.left);
        } else {
          return insRecurHelper(val, node.left);
        }
      } else if(val === node.val) {
        return insRecurHelper(val, null);
      } else {
        if(!node.right) {
          node.right = new Node(val);
          return insRecurHelper(val, node.right.right);
        } else {
          return insRecurHelper(val, node.right);
        }
      }
    }
    
    insRecurHelper(val, this.root);
    return this.root;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if(!this.root) {
      return undefined;
    }
    let currentNode = this.root;
    while(currentNode) {
      if(val === currentNode.val) {
        return currentNode;
      }
      else {
        if(val < currentNode.val) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node=this.root) {
    if(!node) {
      return undefined;
    } else if(val === node.val) {
      return node;
    } else if (val < node.val) {
        return this.findRecursively(val, node.left);
    } 
    return this.findRecursively(val, node.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node=this.root, visitedAccum=[]) {
    visitedAccum.push(node.val);
    if (node.left) this.dfsPreOrder(node.left, visitedAccum);
    if (node.right) this.dfsPreOrder(node.right, visitedAccum);
    
    return visitedAccum;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node=this.root, visitedAccum=[]) {

    if (node.left) this.dfsInOrder(node.left, visitedAccum);
    visitedAccum.push(node.val);
    if (node.right) this.dfsInOrder(node.right, visitedAccum);
    
    return visitedAccum;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node=this.root, visitedAccum=[]) {
    if (node.left) this.dfsPostOrder(node.left, visitedAccum);
    if (node.right) this.dfsPostOrder(node.right, visitedAccum);
    visitedAccum.push(node.val);

    return visitedAccum;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const nodeQueue = new Queue();
    nodeQueue.enqueue(this.root);

    function bfsHelperfunc(nodeQueue, valueAccum=[]) {
      //base case
      if(nodeQueue.isEmpty()) return valueAccum;
      
      //normal case
      let currentNode = nodeQueue.dequeue();

      valueAccum.push(currentNode.val);
      if(currentNode.left) {
        nodeQueue.enqueue(currentNode.left);
      }
      if(currentNode.right) {
        nodeQueue.enqueue(currentNode.right);
      }
      return bfsHelperfunc(nodeQueue, valueAccum);
  }

  return bfsHelperfunc(nodeQueue);
}

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;

binarySearchTree = new BinarySearchTree();
console.log(binarySearchTree.insert(15));
console.log(binarySearchTree.insert(20));
console.log(binarySearchTree.insert(10));
console.log(binarySearchTree.insert(12));
console.log(binarySearchTree.root.val); //15
console.log(binarySearchTree.root.right.val); //20
console.log(binarySearchTree.root.left.right.val); //12

console.log('INSERT RECURSIVELY');
binarySearchTreeRecur = new BinarySearchTree();
console.log(binarySearchTreeRecur.insertRecursively(15));
console.log(binarySearchTreeRecur.insertRecursively(20));
console.log(binarySearchTreeRecur.insertRecursively(10));
console.log(binarySearchTreeRecur.insertRecursively(12));
console.log(binarySearchTreeRecur.root.val); //15
console.log(binarySearchTreeRecur.root.right.val); //20
console.log(binarySearchTreeRecur.root.left.right.val); //12

console.log('FIND');
console.log(binarySearchTree.find(20));
console.log(binarySearchTree.find(120));

console.log('FIND RECURSIVELY');
// console.log(binarySearchTree.findRecursively(15));
console.log(binarySearchTree.findRecursively(20));
console.log(binarySearchTree.findRecursively(120));

binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);

console.log('DFSPREORDER');
console.log(binarySearchTree.dfsPreOrder());

console.log('DFSINORDER');
console.log(binarySearchTree.dfsInOrder());

console.log('DFSPOSTORDER');
console.log(binarySearchTree.dfsPostOrder());

console.log('BFS');
console.log(binarySearchTree.bfs());


