console.log("Let's get this party started!");

async function getGif(searchTerm) {
    const res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`)
    let randomIndex = Math.floor(res.data.data.length * Math.random());
    console.log(res.data.data.length);
    console.log(randomIndex);
    const firstGif = res.data.data[randomIndex].images.original.url
    const gifHolder = document.querySelector('#gif-holder');
    outputImg = document.createElement('img');
    outputImg.src = firstGif;
    gifHolder.append(outputImg);
}

const textIn = document.querySelector('#text-in')
const submit = document.querySelector('#submit');
const removeImgs = document.querySelector('#remove-images');
submit.addEventListener('click', function(e) {
    e.preventDefault();
    getGif(textIn.value);
})
//getGif('cat');
removeImgs.addEventListener('click', function(e) {
    $('#gif-holder').remove();
})