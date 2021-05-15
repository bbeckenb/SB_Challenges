//script inside of body tag
//attach event listener to document itself
//what is the event?
//mapping X & Y coordinates to RGB, top left, RGB=000
//All the way right, R=255
//All the way bottom, B=255
//Window.innerWidth and window.innerHeight

function changeBackgroundColor(x, y, width, height) {
    let r = Math.ceil(255 * (x / width));
    //let g = Math.ceil(255 * ((x + y) / (width + height)));
    let b = Math.ceil(255 * (y / height));
    return `rgb(${r},0,${b})`;
}

document.addEventListener('mousemove', function(e) {
    let x = e.pageX;
    let y = e.pageY;
    let w = window.innerWidth;
    let h = window.innerHeight;
    document.body.style.backgroundColor = changeBackgroundColor(x, y, w, h);
    console.log(e.type);
});
