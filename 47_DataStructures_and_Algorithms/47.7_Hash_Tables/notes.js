/*

Hash Maps are Abstract Data Type for mapping keys -> values
-Like a Python dictionary
-JS Map- or {}

Typical API
-set(key,val) Sets key to value
-get(key) retrieves values for key
-has(key) does the key exist in the map?
-keys() iterable of keys
-values() iterable of values
-entries() iterable of key value pairs

Hash Table/ Hash Map
-use a magic array behind the scenes where we get O(1) for Map methods
-hash function!!!!

*/

// example hash function
function hash(key) {
    return Array.from(key).reduce(
        (accum, char) => accum + char.charCodeAt(), 0
    );
}
// use that data to store info in an Array at a quickly retrievable index
console.log(hash('apple'));

class HashMap {
    constructor() {
        this._items = [];
    }
    set(k, v) {
        const hashedK = hash(k);
        this._items[hashedK] = v;
    }
    get(k){
        const hashedK = hash(k);
        return this._items[hashedK];
    }
}

const hashBrown = new HashMap();
console.log(hashBrown);
hashBrown.set('apple', 'red')
console.log(hashBrown._items);
console.log(hashBrown);
console.log(hashBrown.get('apple'));
hashBrown.set('grape', 'purple')
console.log(hashBrown.get('grape'));

/* Hashing

- Not really a magic array
- Not going to write our own hashing func, or our own class
- Hash Maps are low level structures typically


Runtime of Hash
- Amount of work is not related to the # of items in map
- Related to length of input string in above implementation
- In real world, versions often use part of a string (ex first 100 chars)
    -these then could be O(1) as length of a key does not affect worst case
- We can assume hash is O(1) in discussion of runtime for hash tables

Fast Hashes vs Crypto Hashed
- Hash functions for hash tables, prioritize:
    -speed (must be fast!)
    -wide distribution (spread out values so there are fewer collisions)
- For crypt hashes, like SHA or Bcrypt  
    - make it difficult to reverse output on purpose
    - Always use a proven crypto hash, NOT YOUR OWN

HASH COLLISIONS
-if there is a collision use 'separate chaining', store a bucket at the shared index, usually have a linked list here


HASH TABLE RUNTIMES
-set O(1)
-get, has mostly O(1)
-delete mostly O(1)
-keys, values, entries O(n)
***What does 'mostly' mean? if you store 2450 items, there is a 95% chance there will be a collision


Resizing
-To ensure efficiency, good implementation is to grow/ shrink array
    -aiming to keep it ~75% occupied
This means some .set() and .delete() calls will take longer
    -if shrink/ grown by proportion, will be 'amortized O(1)'

Open Addressing
-Make each bin a single [key, value] pair
-If collision: look at the next 'place'
    -this can be the next bin (this is'linear probing')
    -or there are smarter algorithms to reduce clumping
-we should keep array size large enough to minimizer when this happens
-If we do, and we have a good hash function, we can get amortized O(1)

SETS
-a set is just a map without values
-same runtime characteristics
*/

