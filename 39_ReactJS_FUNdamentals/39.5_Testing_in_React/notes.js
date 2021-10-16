/**
 * Smoke test
    * Does the component render or does it blow up (like a smoking box)?
    * 'render' - React Testing Library's render method
        * Creates a <div>
        * Renders your JSX into the div 
        * Returns an object of methods
            * One method is called asFragment
                * asFragment returns the underlying DOM structure of the component
                    * very useful for snapshot tests  
    * 
 * Snapshot Tests
    * Does the component's rendered HTML render in the way you expect?
    * did rendering change?
    * 
 * React Testing Library
    * https://testing-library.com/docs/react-testing-library/intro/
    * 
 * Extended Matchers    
    * toHaveClass() - check whether an element has a certain class
    * toBeInTheDocument() - check whether an element is in the document
    * toContainHTML() - Check whether the element contains a certain HTML string
    * toBeEmpty() - check whether the element has any content  
 * fireEvent 
 */