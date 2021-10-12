/**
 * Going to use 'create react app' (CRA)
 * Overview
    * Scaling to many files and components
    * Using 3rd party libs
    * Detecting common mistakes early
    * Live-editing CSS and JS in development
    * Optimizing the output for production
    * https://create-react-app.dev/
    * use npx
    * run this command: npx create-react-app my-app
    * creates a skeleton/ file structure for us
 * Webpack
    * Makes sure everything is imported in the proper order
    * ES2015 modules for importing/ exporting
    * Break apps up into smaller logical pieces
 * Good practices
    * one componenet per file  
    * one css stylesheet per component
 * CSS Styling
    * can put an id in with the normal attributes on components
    * if we want to style on a class, type 'className'
    * one css stylesheet per component
        * import the stylesheet at the top of each component file
        * add 'className=NAME_OF_COMPONENT' onto the component parent div
            * use that as the prefix for sub-items to style 
                * ex: <div className="House"
                *       <p className="House-title"
        * properties usually in html (like background-color) are camelcase in React (backgroundColor)   
 * React Fragments, way of grouping components on the DOM without cluttering with all of their parent wrappers 
 * Key prop ant alt prop for images
    * can set alt = to ""
    * key should be id or something 
 */