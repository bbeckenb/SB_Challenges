/**
 * Move routes to another file
 * Switch - acts as an exclusive router because things are inclusive as default
    * makes React pick the first matching route  
    * Order them from most specific to least specific or use 'exact' prop
 * 
 * 404 - if nothing matches you can have <Route> around a component you want to have rendered
 * 
 * Redirect
    * Use <Redirect> component
        * useful for 'you shouldn't have gotten here, go here instead  
        * <Redirect to="/whatever"> at bottom of list of routes, acts as a catch all
        * Can be used in a ternary situation
        * Use it for admin situations
 * 
 * useHistory
    * object wrapper over browser's history API
    * you have access to the history object using the useHistory hook
    * history obj has a .push(url), which adds URL to the session history
        * unlike <Redirect>, hitting back button will return here 
 * 
 * Testing ReactRouter
    * wrap router items in <MemoryRouter>
    * initialEntries is a prop for MemoryRouter 
    * move Browser Router into index, wrap app with it so you can test with MemoryRouter
 * 
 */