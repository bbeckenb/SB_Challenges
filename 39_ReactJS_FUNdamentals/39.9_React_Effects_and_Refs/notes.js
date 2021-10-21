/**
 * useEffect
    * What is a hook? - let you use state without writing a class
    * Fetching data, starting a timer, manually changing the DOM are all 'side effects'
    * Happens after each render
 * Second argument is where the magic happens
    * dependencies, if something changes in the dependency array, useEffect runs
    * if list is empty, it only happens after first render
    * 
 * Cleaning up an Effect
    * Loads when a component unmounts?
 * useRef is like a global variable    
    * Access underlying DOM element, set up and clear timers
    * special object that persists across renders 
 * Antipattern for useRef
    * expose DOM elements for us (don't do this! you will DIE)  
 */