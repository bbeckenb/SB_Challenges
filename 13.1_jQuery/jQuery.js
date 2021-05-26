//Methods to simplify DOM manipulation, animation, etc.
//Why would I use it?
//Before 2015 changes, it was MUCH more difficult to do certain things
//and do things in all browsers
//High liklihood you end up at some place that uses jQuery
//Good use case for prototyping because it is very fast
//grab minified jQuery script from http://code.jquery.com/

//gives us a jQuery Object, not the same as a DOM element
$('h2').text('changed it');
console.log('this is a jQuery obj', $('h2'))

//holds all refs in an array like obj
const inputs = $('input');
console.log(inputs)

//can grab indexed item from array

const input = $('input').eq(0);

console.log(input);

//can programmatically get the value
console.log(input.val());

//can programmatically change attributes w/ KVP
input.attr({type: 'color'});

//can grab css properties
console.log($('h2').css('color'));

//can also change them 
$('h2').css('font-size', '20px');

const big = {color: 'purple', 'font-size': '50px'};
$('h2').css(big);

//CSS class methods
$('h2').addClass('completed');

//can use toggleClass

//you can chain methods 
$('h2').removeClass('completed').text('crazyyyyy');

//a lot of traversal methods to find parents and children
const specialInput = $('input').eq(3);
console.log(specialInput.parent());

//creating and appending elements 
$('section').append('<li class=completed>I AM NEW</li>');

//can do this to many elements at once
$('p').append('<h3>I AM AN INPUT</h3>');

//.remove() deletes element and childrens
$('h2').remove();

$('<h2>I AM BACK</h2>').appendTo('p');

//add event listeners
$('h2').on('click', function () {
    $(this).css({'font-size':'40px'});
})

//Event delegation use .on as seen directly above
$('form').on('click', 'input', function() {
    $(this).css({'background-color': 'teal'});
})

//animations
//.fadeOut();
$('form').on('click', 'h2', function() {
    $(this).fadeOut(3000);
})

$('form').on('click', 'h3', function() {
    $(this).animate({opacity: 0, 'font-size': '5px'}, 2000, function() {
      $(this).remove();  
    })
    
})
