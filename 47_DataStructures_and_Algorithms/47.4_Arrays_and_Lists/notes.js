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
