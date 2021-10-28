/**
 * Janky Solution vvv
 * <a onClick={() => setPage('something')}/a>
 * The above routing solution is not great (janky)
 * Also, clicking forwards and backwards does not operate appropriately
 * 
 * Install: $ npx create-react-app routed
$ cd routed
$ npm install react-router-dom
 * wrap things like navbar in <BrowserRouter>
 * Inside BrowserRouter define routes, ex:
    * <Route exact path="/">
        <Home />
      </Route>
 * exact path will match what you have in your path
      just 'path' will be more general
 * <Link> component is React equivalent of <a> tag in html
    * instead of href, <Link> uses a 'to' prop 
    * clicking on <Link> does not issue a 'GET' request, JS intercepts click and does client side routing
 * import {NavLink} from 'react-router-dom';
 * The above gives us NavLink item built-in components
    * If at page that link would go to, the <a> gets a CSS class of active
 * Move NavBar into its own component 
 *  
 */