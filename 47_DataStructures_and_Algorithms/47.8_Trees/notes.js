/**
 * Tree (data structure)
 * Hierarchial Structure
 * File system is a tree
 *  root is the base (like root directory)
 *  children and descendants are below the root
 *  nodes above others are parents and ancestors
 * 
 * Every element is a node
 * children are nodes directly below (direct descendants)
 * leaf nodes have no descendants
 * Every node could be considered its own tree
 */

class Node {
    constructor(val, children=[]) {
        this.val= val;
        this.children= children;
    }
    findDFS(val) {
        const toVisitStack = [this];
        while(toVisitStack.length) {
            const current = toVisitStack.pop();
            if(current.val === val) {
                return current;
            }
            for (let child of current.children) {
                toVisitStack.push(child);
            }
        }
    }

    findBFS(val) {
        const toVisitQueue = [this];
        while(toVisitQueue.length){
            const current = toVisitQueue.shift();
            console.log("VISITING:", current.val)
            if(current.val === val) {
                return current;
            }
            for (let child of current.child){
                toVisitQueue.push(child);
            }
        }
    }
}

let amy = new Node('amy');

let bob = new Node('bob');
let barb = new Node('barb');
let barry = new Node('barry');

amy.children.push(bob);
amy.children.push(barb);
amy.children.push(barry);

// tree traversal

class Tree {
    constructor(root){
        this.root = root;
    }
    findInTreeDFS(val){
        return this.root.findDFS(val);
    }
    findInTreeBFS(val) {
        return this.root.findBFS(val);
    }
}
