/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  countNodes() {
    let nodeCount = 0;
    if(!this.root) {
      return nodeCount;
    }
    else {
      const toVisitQueue = [this.root];
      while(toVisitQueue.length) {
        const currentNode = toVisitQueue.shift();
        nodeCount += 1;
        if (!!currentNode.left) {
          toVisitQueue.push(currentNode.left);
        }
        if (!!currentNode.right) {
          toVisitQueue.push(currentNode.right);
        }
      }
      return nodeCount;
    }
  }

  countLeafs() {
    let leafCount = 0;
    
    if(!this.root) {
      return leafCount;
    }
    else {
      const toVisitQueue = [this.root];
      while(toVisitQueue.length) {
        const currentNode = toVisitQueue.shift();
        if (!!currentNode.left) {
          toVisitQueue.push(currentNode.left);
        }
        if (!!currentNode.right) {
          toVisitQueue.push(currentNode.right);
        }
        if (!currentNode.left & !currentNode.right) {
          leafCount += 1;
        }
      }
      return leafCount;
    }
  }
  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  // __recurseDepth(count=0, leftNode=this.root, rightNode=this.root)

  minDepth(depth=0, node=this.root) {
    let nodeDepth = 0;
    if(!this.root) {
      return nodeDepth;
    }
    else {
      nodeDepth += 1;
      let nodeCount = this.countNodes();
      let level = [];
      let nextLevel = [this.root];
      const depthList = [];
      while(nodeCount > 0) {
        level = [...nextLevel];
        for (let currentNode of level) {
          if(!currentNode.left & !currentNode.right) {
            depthList.push(nodeDepth);
          }
          if(!!currentNode.left) {
            nextLevel.push(currentNode.left);
          }
          if(!!currentNode.right) {
            nextLevel.push(currentNode.right);
          }
          nodeCount--;
        }
        nodeDepth += 1;
      }
    return Math.min(...depthList);
    }

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let nodeDepth = 0;
    if(!this.root) {
      return nodeDepth;
    }
    else {
      nodeDepth += 1;
      let nodeCount = this.countNodes();
      let level = [];
      let nextLevel = [this.root];
      const depthList = [];
      while(nodeCount > 0) {
        // console.log(`level ${level}, next level ${nextLevel} node count ${nodeCount}`)
        level = [...nextLevel];
        nextLevel = [];

        for (let currentNode of level) {
          if(!currentNode.left & !currentNode.right) {
            depthList.push(nodeDepth);
          }
          if(!!currentNode.left) {
            nextLevel.push(currentNode.left);
          }
          if(!!currentNode.right) {
            nextLevel.push(currentNode.right);
          }
          nodeCount--;
        }
        nodeDepth += 1;
        // console.log(`level ${level}, next level ${nextLevel} node count ${nodeCount}`)
      }
      // console.log(this.root);
      // console.log(depthList);
    return Math.max(...depthList);
    }
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSumOneDirection() {
    let nodeDepth = 0;
    if(!this.root) {
      return nodeDepth;
    }
    else {
      nodeDepth++;
      let maxDepth = this.maxDepth();
      let level = [];
      let nextLevel = [this.root];
      const sumArray = [];
      sumArray.push(this.root.val);
      while(nodeDepth < maxDepth) {
        level = [...nextLevel];
        nextLevel = [];
        let currLevelNodeCount = 0;

        for (let currentNode of level) {
          let parentValIndex = (2**(nodeDepth-1)-1) + currLevelNodeCount;
          if(!!currentNode.left) {
            sumArray.push(currentNode.left.val + sumArray[parentValIndex]);
            nextLevel.push(currentNode.left);
          }
          else {
            sumArray.push(null);
            nextLevel.push(new BinaryTreeNode(null,null,null));
          }
          if(!!currentNode.right) {
            sumArray.push(currentNode.right.val + sumArray[parentValIndex]);
            nextLevel.push(currentNode.right);
          }
          else {
            sumArray.push(null)
            nextLevel.push(new BinaryTreeNode(null,null,null));
          }
          currLevelNodeCount++;
        }
        nodeDepth += 1;
      }
    return Math.max(...sumArray);
  }  
  
  
  // (l=this.countLeafs(), sum=this.root.val, node=this.root, sumAccum=[]) {
    // //base case
    // if(l === 0) return Math.max(...sumAccum);

    // //normal case
    // if (!!node.left) {
    //   this.maxSum(l, sum + node.left.val, node.left, sumAccum);
    // }
    // if(!!node.right) {
    //   this.maxSum(l, sum + node.right.val, node.right, sumAccum);
    // }
    // sumAccum.push(sum)
    // return this.maxSum(l-1, sum, this.root, sumAccum)
    


    // const nodeLeft = nodeToCheck.left;
    // const nodeRight = nodeToCheck.right;
    // let leftSum = sum + nodeLeft.val;
    // let rightSum = sum + nodeRight.val;
    
    // if (!!nodeLeft.left) {
    //   this.maxSum(n-1, nodeLeft.left, leftSum + nodeLeft.left.val, sumAccum)
    // }
    // if (!!nodeLeft.right) {
    //   this.maxSum(n-1, nodeLeft.right, leftSum + nodeLeft.right.val, sumAccum)
    // }
    // if (!!nodeRight.left) {
    //   this.maxSum(n-1, nodeLeft.left, leftSum + nodeLeft.left.val, sumAccum)
    // }
    // if (!!nodeLeft.right) {
    //   this.maxSum(n-1, nodeLeft.right, leftSum + nodeLeft.right.val, sumAccum)
    // }
    // if (!nodeLeft.left & !nodeLeft.right) {
    //   sumAccum.push(leftSum);
    //   n=n-1;
    // }
    // if(!nodeRight.left & !nodeRight.right) {
    //   sumAccum.push(rightSum);
    //   n=n-1;
    // }
    
  }

  flattenBinTree() {
    let nodeDepth = 0;
    if(!this.root) {
      return nodeDepth;
    }
    else {
      nodeDepth++;
      let maxDepth = this.maxDepth();
      let level = [];
      let nextLevel = [this.root];
      const flattenedBinTree = [];
      flattenedBinTree.push(this.root.val);
      while(nodeDepth < maxDepth) {
        level = [...nextLevel];
        nextLevel = [];

        for (let currentNode of level) {
      
          if(!!currentNode.left) {
            flattenedBinTree.push(currentNode.left.val);
            nextLevel.push(currentNode.left);
          }
          else {
            flattenedBinTree.push(null);
            nextLevel.push(new BinaryTreeNode(null,null,null));
          }
          if(!!currentNode.right) {
            flattenedBinTree.push(currentNode.right.val);
            nextLevel.push(currentNode.right);
          }
          else {
            flattenedBinTree.push(null)
            nextLevel.push(new BinaryTreeNode(null,null,null));
          }
        }
        nodeDepth += 1;
      }
    return flattenedBinTree;
  } 
} 

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    const flattenedTreeToCheck = this.flattenBinTree()
    const filteredTreeList = flattenedTreeToCheck.filter(val => val > lowerBound);
    if(filteredTreeList.length === 0) {
      return null;
    }
    else {
      return Math.min(...filteredTreeList);
    }
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };

emptyTree = new BinaryTree();

// build small tree;
let smallLeft = new BinaryTreeNode(5);
let smallRight = new BinaryTreeNode(5);
let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
smallTree = new BinaryTree(smallRoot);

// build large tree
let node6 = new BinaryTreeNode(1);
let node5 = new BinaryTreeNode(1);
let node4 = new BinaryTreeNode(2);
let node3 = new BinaryTreeNode(3, node4, node6);
let node2 = new BinaryTreeNode(5, node3, node5);
let node1 = new BinaryTreeNode(5);
let root = new BinaryTreeNode(6, node1, node2);
largeTree = new BinaryTree(root);

console.log('small tree min depth', smallTree.minDepth()); //2
console.log('large tree min depth', largeTree.minDepth()); //2
console.log('empty tree min depth', emptyTree.minDepth()); //0

console.log('small tree max depth', smallTree.maxDepth()); //2
console.log('large tree max depth', largeTree.maxDepth()); //4
console.log('empty tree max depth', emptyTree.maxDepth()); //0
// largeTree.maxDepth()

// console.log(largeTree.countLeafs())
console.log(largeTree.maxSumOneDirection()) //11
console.log(smallTree.maxSumOneDirection()) //16
console.log(largeTree.flattenBinTree())
console.log(largeTree.nextLarger(1)) //2
console.log(largeTree.nextLarger(2)) //3
console.log(largeTree.nextLarger(3)) //5
console.log(largeTree.nextLarger(4)) //5
console.log(largeTree.nextLarger(5)) //6
console.log(largeTree.nextLarger(6)) //null
