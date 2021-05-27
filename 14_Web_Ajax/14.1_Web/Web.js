// What is HTTP?
//      HyperText Transfer Protocol - established to 
//      enable requests and responses between clients and servers
// What is a URL?
//      Uniform Resource Locator - Mechanism for browsers to 
//      retrieve any published resource on the web, it is an 
//      address to a unique resource (HTML page, CSS document, 
//      images, etc.)
// What is DNS?
//      Domain Name Server - like the phonebook for the WWW, 
//      helps us locate hostname, maintains a list of domain names
//      along w/ the resources like IP addresses (converts between the two)
// What is a query string?
//      Query/ Search String is the search property of the URL. Allows
//      for user to find specific content or actions, pass as KVPs w/ ?
// What are two HTTP verbs and how are they different?
        //GET - Makes a request client side and makes no change to server side
        //POST - Makes a request and passes arguments to the server side
// What is an HTTP request?
        //Client side action, sends URL to server for info (request reddit.com)
// What is an HTTP response?
        //Server action based on what was originally 
        //requested and communication with the DB server
        //Sends back HTML/CSS/JS/etc
// What is an HTTP header? Give a couple examples of request and response headers you have seen.
        //Part of HTTP Request/Response Messages
        //Contains info about the HTTP body and the Request/ Response
        //Info like hostname/date/language/cookies
// What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
        //The browser sends an HTTP request, server 
        //communicates w/ server DB to locate URL and send info back to client
        /*Your browser “resolves” the name into an IP address using DNS
Your browser makes a request to that IP address, including headers (info about browser, any previous cookies, and other things)
The server sends a response (typically, HTML, with a status code (200 if it was sucessful)
The browser makes a DOM from that HTML, and finds any other resources needed (images, CSS, JavaScript, etc)
The browser makes separate HTTP requests for those resources and receives response from the server for each*/
