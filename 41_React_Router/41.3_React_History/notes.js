/**
 * History of React
    * React.createClass was first React method in 2013!
    * class components needed render methos describing what the component should render
    * 
    * useState:
    * 'this' does not work when passing class methods to elements/ components
        * work-around, need to use .bind to constructor methods
        * not ideal, a lot of code, v clunky
        * there is a syntactical alternative (see CounterRenderProps): functionName = () => {commands} 
    * 
    * Component Lifecycle
    * useEffect (see LifeCycle):
    * constructor - runs when the component first tries to mount
    * render - renders the component
    * componentDidMount - Runs after the first render only, great for fetching data
    * componentDidUpdate - Runs after the component is updated. Does not run after the first render. Good place to optionally fetch data, sync to localStorage
    * componentWillUnmount - Runs before the component is set to be removed from the DOM. Good place to clean up timers or cancel network requests
    * 
    * Challenges with early React
        * Repeating code and logic in the lifecycle
        * Passing state to components 
    * 
    * Mixin
        * share business logic for manipulating state across several components (see counterMixin)
        * Mixins have shortcomings in that they cause snowballing complexity, introduce implicit dependencies, force different components to use the same naming conventions    
    * 
    * higher Order Components are not very customizable once they're set up
    * Hooks are way better than anything ever here
    * 
    * Hooks
        * function and class components appeared in React at the same time. However, function components originally could not contain state or make use of lifecycle methods
        * intro'd in React 16.8 
        * affect state
        * Can use this hook in any of our components and test it easily in isolation
        * No HOC required
        * How do they work?
            * What is closure - inability for inner functions to remember variables defined in outer functions, long after the outer function has returned
        * Hooks use closure to store state, refs, etc.
        *  
    * 
 */