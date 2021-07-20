/**
 * Bin Search Tree has additional constraint on top of Bin Tree
 * O(log(n)) to search sorted array
 * O(n) to insert into array because we have to shift vals
 *  Root is 'mid-point'
 *  right node is > than
 *  left node is < than
 * v fast for searching
 * 
 * BST Class
 * Node Class
 * Tree Class
 * 
 * PERFORMANCE
 *  find function is O(log(n))
 * 
 * UNBALANCED BIN SEARCH TREES
 *  One side has a much larger proportion of nodes, want to minimize height of tree
 *  One strategy to rebalance is to 'shuffle' values upon insert
 *  Another one is sort values and start from the middle, work outward
 *  AVL (names of creators) Trees are self-balancing, will rebalance once it realizes the height on left and right differ
 *      These are somewhat inefficient
 * Red Black Tree - 'reasonably balanced'
 * 
 * TRAVERSING
 *  Recurse
 * 
 * BINARY TREES VS HASHMAP
 * HashMap
    * O(1) lookup/addition/deletion
    * Have to know exactly what you are looking for
    * Can't find ranges of things
 * Bin Search Tree
 * O(log(n)) lookup/addition/deletion
    * Can search for exact value or inequalities
    * Can search for ranges
 */

class Node {
    constructor(val, left=null, right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    find(sought) {
        let currentNode = this;
        while(currentNode) {
            console.log("VISITING", currentNode.val);
            if(currentNode.val) return currentNode;
            if(currentNode.val > sought) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
    }

    traverse(node=this.root) { //in order traversal
        if(node.left) this.traverse(node.left);
        console.log(node.val)
        if(node.right) this.traverse(node.right);
        //what order do we visit left, self, right
    }
}

const E = new Node('E');
const A = new Node('A');
const B = new Node('B');
const C = new Node('C');
const D = new Node('D');
const F = new Node('F');
const G = new Node('G');

E.left = B;
E.right = G;
B.left = A;
B.right = D;
G.left = F;

class BinarySearchTree {
    constructor(root=null) {
        this.root = root;
    }
}

const tree = new BinarySearchTree(E);