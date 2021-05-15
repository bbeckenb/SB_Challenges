//When a ____ event occurs on ____ element, do this ____
//ex: click -> button -> 'Hi!'
//inline is not ideal
// https://developer.cdn.mozilla.net/en-US/docs/Web/Events?retiredLocale=uk
document.addEventListener('DOMContentLoaded', function() {
    //alert('DOM content loaded'); //DOMEvent
    document.body.style.backgroundColor = 'blue';
})

window.addEventListener('load', function() {
    console.log('Fully loaded'); //WindowEvent
});
//can use this to wait until content is fully loaded on the page

function makeBody(color) {
    document.body.style.backgroundColor = color;
}

const btn = document.querySelector('#teal');
btn.onclick = function () { //Need to use anonymous function, cannot pass function directly or JS will execute immediately
    makeBody('teal');
}

const h1 = document.querySelector('h1');

//adding event listeners using addEventListener("name of event", callback_function());
const violetBtn = document.querySelector('#violet');
violetBtn.addEventListener('click', function() {
    makeBody('violet');
});

//can have multiple event listeners on the same object
violetBtn.addEventListener("dblclick", function() {
    h1.style.color = 'cyan';
})

//A gotcha for new devs is not properly waiting for the DOM to Load
//Script runs before the DOM is loaded, reads top to bottom
//one solution is to put script at the bottom of the html code
/*more elegant solution is to use document.addEventListener("DOMContentLoaded", function() {
    code goes here
}

example of function of DOM and window at the top, tagged DOMEvent and WindowEvent
*/

// What is on the inside of The Event Object?

const p = document.querySelector('#EventObject');
p.addEventListener('click', function(e) {
    console.log(e.pageX); //X-position on page
    console.log(e.type); //event type
});

p.addEventListener('mousedown', function(e) {
    console.log(e.pageX); //X-position on page
    console.log(e.type); //event type
});

//EVENT DELEGATION
//can do this manually, when we create a new element, just add an event listener there
//this sets us up to potentially have a lot of event listeners
//OR, we could make an event delegate (set up listener on the parent element, then detect which child was interacted with)
//use 'tagName' to do this
/* EXAMPLE - you can set multiple element actions w/ one delegate listener
variableHoldingElement.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
    }
    else if (e.target.tagName === 'LI') {
        e.target.classList.add('best-friend');
        const heart = document.createElement('span');
        heart.innerHTML = '&hearts;';
        e.target.prepend(heart);
    }
});
*/

//HTML entity code if you want to add stars and stuff
//USE innerHTML for these codes

/* Data Attributes - When Creating elements and HTML pages, it's very common that you might want to add some metadata or additional info about elements
These are not things users should see, but accessible items from CSS and JS
instead of creating an id or class, we create custom attributes called 'data attributes'
These start with 'data-' and then anything you want
*/
//can collect these into DOM string map
const purple_button = document.querySelector('#purple');
purple_button.addEventListener('click', function(e) {
    console.log(e.target.getAttribute('data-button'));
});

const b_list = document.querySelector('#b_list');
b_list.addEventListener('click', function(e) {
    console.log(e.target.getAttribute('data-year'));
    console.log(e.target.dataset);
});

//localStorage
const preferences = {
    fontSize: '18px',
    favColor: 'green'
};
/*Notes for 4.4 
LocalSTORAGE will store objects/ arrays/ any inputted items as strings so we 
use JSON stringify and parse to preserve our desired format*/
//JSON is JavaScript Object Notation
localStorage.setItem('preferences', JSON.stringify(preferences));
console.log('localStorage object output without JSON.parse');
console.log(localStorage.getItem('preferences'));
console.log('localStorage object output WITH JSON.parse');
console.log(JSON.parse(localStorage.getItem('preferences')));
