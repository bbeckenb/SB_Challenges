/**
 * Graphs are like trees but they can contain loops
 * Lines can be directional or undirectional
 * 
 * Node (or Vertex) - basic unit
 * Edge (or Arc) - connects two nodes
 * Adjacent - two nodes are adjacent if they share an edge (are connected)
 * Weight (optional) - each edge can have a weight (ex: price or distance?)
 * 
 * Use adjacency list to store relationships between nodes
 * Trees are specific/ constrained graphs
 * Very common use of graphs to store info about cities
 * Another example would be carpool matches for uber or lyft
 * 
 * Always model relationships between things
 * 
 * Trees are acyclic
 * Graphs can be cyclical, can go through a loop of nodes to get back to the same place
 * 
 * Linked List - Nodes have 0 or 1 children; acyclic and directed
 * Tree - Nodes have 0+ children; acyclic and directed; only one designated root node
 * Graphs - Nodes have 0+ connections; cyclic or acyclic; directed or undirected;
 *          disconnected or connected; optional weights
 * 
 * Adjacency Lists - List containing all nodes sharing an edge
 * Adjacency matrix - have a 1 if two nodes have an edge, 0 if not
 */

class PersonNode {
    constructor(name, adjacent = new Set()) {
        this.name = name;
        this.adjacent = adjacent;
    }
}

class FriendGraph {
    constructor() {
        this.nodes = new Set();
    }

    addPerson(node) {
        this.nodes.add(node);
    }

    addPeople(peopleList) {
        for(let node of peopleList) {
            this.addPerson(node);
        }
    }

    setFriends(person1, person2) {
        person1.adjacent.add(person2);
        person2.adjacent.add(person1);
    }

    areConnected(person1, person2) {
        let toVisitQueue = [person1];
        let seen = new Set(toVisitQueue);
        while(toVisitQueue.length) {
            let currPerson = toVisitQueue.shift();

            if(currPerson === person2) return true;

            for(let neighbor of currPerson.adjacent) {
                if(!seen.has(neighbor)) {
                    toVisitQueue.push(neighbor)
                    seen.add(neighbor);
                }
            }
        }
        return false;
    }

    areConnectedDFS(person1, person2) {
        let toVisitQueue = [person1];
        let seen = new Set(toVisitStack);
        while(toVisitQueue.length) {
            let currPerson = toVisitStack.pop();

            if(currPerson === person2) return true;

            for(let neighbor of currPerson.adjacent) {
                if(!seen.has(neighbor)) {
                    toVisitQueue.push(neighbor)
                    seen.add(neighbor);
                }
            }
        }
        return false;
    }

    areConnectedRecursive(person1, person2, seen=new Set([person1])) {
        if(person1 === person2) return true;
        for(let neighbor of person1.adjacent) {
            if(!seen.has(neighbor)) {
                seen.add(neighbor);
                if(this.areConnectedRecursive(neighbor, person2, seen)) {
                    return true;
                }
            }
        }
        return false;
    }
}

const homer = new PersonNode('homer simpson');
const marge = new PersonNode('marge simpson');
const maggie = new PersonNode('maggie simpson');
const lisa = new PersonNode('lisa simpson');
const grampa = new PersonNode('grampa simpson');
const moe = new PersonNode('moe');
const barney = new PersonNode('barney');
const lenny = new PersonNode('lenny');

const friends = new FriendGraph();
friends.addPeople([homer,marge,maggie, lisa, grampa]);

friends.setFriends(homer, marge);
friends.setFriends(homer, lisa);
friends.setFriends(homer, maggie);
friends.setFriends(maggie, marge);
friends.setFriends(maggie, lisa);
friends.setFriends(grampa, lisa);

friends.addPeople([moe, barney, lenny]);
friends.setFriends(moe, barney);
friends.setFriends(lenny, barney);
// neo4J

//have to watch out for cycles, use a second temp set check unions


