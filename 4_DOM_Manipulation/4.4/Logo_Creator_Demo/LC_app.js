
// const form = document.querySelector("#monkeyform");
// form.addEventListener('submit', function(event) {
//     alert('you submitted the form');
//     event.preventDefault(); //use this method to prevent default behavior
// })
// //how do you know what default behaviors are???
// document.querySelector('input[type=checkbox]').addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log('no checkbox default actions for you, user!');
// });

//most often this is done on a form
const form = document.querySelector('#logoform');
const outputSection = document.querySelector('#results');
const brandInput = document.querySelector('input[name="brandname"]');
const brandColor = document.querySelector('input[name="color"]');
const brandSize = document.querySelector('input[name="fontsize"]');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newLogo = document.createElement('h3');
    newLogo.innerText = brandInput.value;
    newLogo.style.color = brandColor.value;
    newLogo.style.fontSize = `${brandSize.value}px`;
    outputSection.append(newLogo);
});



