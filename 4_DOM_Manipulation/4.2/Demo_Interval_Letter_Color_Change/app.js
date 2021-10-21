function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    // const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},0,${b})`
}

const h1 = document.querySelector('h1');


const letters = document.querySelectorAll('.letter');


setInterval(function() {
    for (let letter of letters) {
        letter.style.color = randomRGB();
    }
}, 750)

