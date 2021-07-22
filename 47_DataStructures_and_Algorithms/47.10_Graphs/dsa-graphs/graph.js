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

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let v of vertexArray) {
      this.addVertex(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let adjVertex of vertex.adjacent) {
      this.removeEdge(vertex, adjVertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    if(this.nodes.has(start)) {
      let toVisitStack = [start];
      let seen = new Set();
      let returnArray = [];
      
      while(toVisitStack.length) {
        let currentNode = toVisitStack.pop();
        seen.add(currentNode);
        for(let neighbor of currentNode.adjacent) {
          if(!seen.has(neighbor)) {
            toVisitStack.push(neighbor);
            seen.add(neighbor);
          }
        }
        returnArray.push(currentNode.value);
      }
      return returnArray;
    } else {
      throw 'error: requested starting node not in graph';
    }
  }
    
  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    if(this.nodes.has(start)) {
      let toVisitQueue = new Queue();
      toVisitQueue.enqueue(start);
      let seen = new Set();
      let returnArray = [];
      
      while(!toVisitQueue.isEmpty()) {
        let currentNode = toVisitQueue.dequeue();
        seen.add(currentNode);
        for(let neighbor of currentNode.adjacent) {
          if(!seen.has(neighbor)) {
            toVisitQueue.enqueue(neighbor);
            seen.add(neighbor);
          }
        }
        returnArray.push(currentNode.value);
      }
      return returnArray;
    } else {
      throw 'error: requested starting node not in graph';
    }
  }
}

module.exports = {Graph, Node}

let graph = new Graph();
let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
// console.log(graph.nodes.has(a)) //false
// console.log(graph.nodes.has(b)) //false
// console.log(graph.nodes.has(c)) //false
// graph.addVertex(a);
// graph.addVertex(b);
// graph.addVertex(c);
// console.log(graph.nodes.has(a)) //true
// console.log(graph.nodes.has(b)) //true
// console.log(graph.nodes.has(c)) //true
console.log('\nADDVERTICES');
console.log(graph.nodes.has(a)) //false
console.log(graph.nodes.has(b)) //false
console.log(graph.nodes.has(c)) //false
graph.addVertices([a,b,c]);
console.log(graph.nodes.has(a)) //true
console.log(graph.nodes.has(b)) //true
console.log(graph.nodes.has(c)) //true

console.log('\nADDEDGE');
let d = new Node("D");
graph.addVertices([a, b, c, d]);
graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, d);
graph.addEdge(c, d);
console.log(a.adjacent); //b, c
console.log(b.adjacent); //a, d
console.log(c.adjacent); //a, d
console.log(d.adjacent); //b, c

console.log('\nREMOVEEDGE');
graph.removeEdge(b, a);
graph.removeEdge(c, d);
console.log(a.adjacent); //c
console.log(b.adjacent); //d
console.log(c.adjacent); //a
console.log(d.adjacent); //b

console.log('\nREMOVEVERTEX');
graph.addVertices([a, b, c, d]);
graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, d);
graph.addEdge(c, d);

graph.removeVertex(c);
graph.removeVertex(d);

console.log(graph.nodes.has(a)) //true
console.log(graph.nodes.has(b)) //true
console.log(graph.nodes.has(c)) //false
console.log(graph.nodes.has(d)) //false

graph.removeVertex(a);
graph.removeVertex(b);
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph.addVertices([S,P,U,X,Q,Y,V,R,W,T])

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

// console.log(graph);
console.log('\ngraph.depthFirstSearch(S)');
console.log(graph.depthFirstSearch(S)); // ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"]

console.log('\ngraph.breadthFirstSearch(S)');
console.log(graph.breadthFirstSearch(S)); //["S", "P", "U", "X", "Q", "V", "Y", "R", "W", "T"]