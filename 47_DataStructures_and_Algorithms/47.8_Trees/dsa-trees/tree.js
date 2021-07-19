/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let sum = 0;
    
    if(!this.root){
      return sum;
    }

    else {
      const toVisitQueue = [this.root]; //fill w/ nodes starting at root

      while(toVisitQueue.length) {
        const currentTreeNode = toVisitQueue.shift();
        if(!currentTreeNode.val) {
          sum += 0;
        }
        sum += currentTreeNode.val;
        for (let child of currentTreeNode.children) {
          toVisitQueue.push(child);
        }
      }
      return sum;
    }
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let count = 0;
    if(!this.root) {
      return count;
    }
    else {
      const toVisitStack = [this.root];
      while(toVisitStack.length) {
        const currentTreeNode = toVisitStack.pop();
        if(!!currentTreeNode.val & currentTreeNode.val%2 === 0) {
          count += 1;
        } 
        for (let child of currentTreeNode.children) {
          toVisitStack.push(child);
        }
      }
      return count;
    }
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0;
    if (!this.root) {
      return count;
    }
    else {
      const toVisitQueue = [this.root];
      while(toVisitQueue.length) {
        const currentTreeNode = toVisitQueue.shift();
        if (currentTreeNode.val > lowerBound) {
          count += 1;
        }
        for (let child of currentTreeNode.children) {
          toVisitQueue.push(child);
        }
      }
      return count;
    }
  }
}

module.exports = { Tree, TreeNode };

emptyTree = new Tree();

  // build small tree
  let nSmall = new TreeNode(1);
  let nSmall2 = new TreeNode(2);
  nSmall.children.push(nSmall2);
  smallTree = new Tree(nSmall);

  // build large tree
  let n = new TreeNode(1);
  let n2 = new TreeNode(2);
  let n3 = new TreeNode(3);
  let n4 = new TreeNode(4);
  let n5 = new TreeNode(5);
  let n6 = new TreeNode(6);
  let n7 = new TreeNode(7);
  let n8 = new TreeNode(8);

  n.children = [n2, n3, n4];

  n4.children.push(n5, n6);
  n6.children.push(n7);
  n7.children.push(n8);

  largeTree = new Tree(n);

  console.log('smallTree sum', smallTree.sumValues()); //3
  console.log('largeTree sum', largeTree.sumValues()); //36
  console.log('emptyTree sum', emptyTree.sumValues()); //0

  console.log('smallTree evens', smallTree.countEvens()); //1
  console.log('largeTree evens', largeTree.countEvens()); //4
  console.log('emptyTree evens', emptyTree.countEvens()); //0

  console.log('small tree numGreater', smallTree.numGreater(0)) //2
  console.log('small tree numGreater', smallTree.numGreater(1)) //1
  console.log('small tree numGreater', smallTree.numGreater(2)) //0
  console.log('small tree numGreater', smallTree.numGreater(3)) //0

  console.log('large tree numGreater', largeTree.numGreater(0)) //8
  console.log('large tree numGreater', largeTree.numGreater(4)) //4
  console.log('large tree numGreater', largeTree.numGreater(8)) //0

  console.log('empty tree numGreater', emptyTree.numGreater(0)) //0