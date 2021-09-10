/*
async functions
-ES2017
-ALWAYS RETURNS A PROMISE
    -will always return resolved promise
    -if we want an error to propogate in async function, we need to throw an error
*/

// async function sayHi() {
//     return "HELLO!"
// }

// async function sayHi() {
//     return "HELLO!"
// }

// sayHi()

// async function oops() {
//     throw "BAD IDEA!"
// }

// oops()
//     .then(msg => {
//         console.log(msg)})
//     .catch(err => {
//         console.log("INSIDE CATCH: ", err)
//     })

/*
Put await in async function, it will pause the execution of that function, 
next line of code in that function will not run until data is returned 
from whatever we are awaiting
*/

async function getStarWarsData() {
    console.log("STARTING")
    const res = await axios.get("https://swapi.dev/api/planets/1/")
    console.log("ENDING")
    console.log(res)
}

// PROMISE FUNCTION STRUCTURE
function changeColor(elem, color) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            elem.style.color = color
            resolve()
        }, 1000)
    })
}

// changeColor(h1, 'teal')
//     .then(() => changeColor(h1, 'orange'))
//     .then(() => changeColor(h1, 'yellow'))
//     .then(() => changeColor(h1, 'green'))
//     .then(() => changeColor(h1, 'blue'))
//     .then(() => changeColor(h1, 'indigo'))
//     .then(() => changeColor(h1, 'violet'))
const h1 = document.querySelector('h1')
async function rainbow(elem) {
    await changeColor(elem, 'red')
    await changeColor(elem, 'orange')
    await changeColor(elem, 'yellow')
    await changeColor(elem, 'green')
    await changeColor(elem, 'blue')
    await changeColor(elem, 'indigo')
    await changeColor(elem, 'violet')
}
rainbow(h1)
// add async methods to stand-alone objects
const deck = {
    async init() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
        this.deckID=res.data.deck_id;
        console.log(res);
    },
    async shuffle() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/shuffle/`)
        console.log(res)
    },
    async drawCard() {
        let res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)
        console.log(res)
    }
}

// Add instance methods to classes
class Pokemon {
    constructor(id) {
        this.id = id;
    }
    async getInfo(){
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        console.log(res)
        this.name = res.data.data;
        for(let type of res.data.types) {
            console.log(type)
        }
    }
}

// error handling, use try/ catch
async function getStarWarsFilms(word) {
    try {
        // word is 'planets'
        let url_1 = `https://swapi.dev/api/${word}/1/`;
        let res = await axios.get(url_1);
        console.log(res);
    } catch(e) {
        console.log("Word DNE!")
    }
        
}

// Refactor Async Code
async function getThreePokemonAsync() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon";
    let { data: p1 } = await axios.get(`${baseURL}/1`)
    console.log(p1.name)
    let { data: p2 } = await axios.get(`${baseURL}/2`)
    console.log(p2.name)
    let { data: p3 } = await axios.get(`${baseURL}/3`)
    console.log(p3.name)
}

// Parallel requests
async function getThreePokemonParallel() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon";
    let p1Promise = await axios.get(`${baseURL}/1`)
    let p2Promise = await axios.get(`${baseURL}/2`)
    let p3Promise = await axios.get(`${baseURL}/3`)

    let p1 = await p1Promise;
    let p2 = await p2Promise;
    let p3 = await p3Promise;

    console.log(`first pokemon is ${p1.data.name}`)
    console.log(`second pokemon is ${p2.data.name}`)
    console.log(`third pokemon is ${p3.data.name}`)
}

getThreePokemonParallel();

// can also do await Promise.all()
async function getThreePokemonParallelPromiseAll() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon";
    let pokes = await Promise.all([axios.get(`${baseURL}/1`), 
    axios.get(`${baseURL}/2`), 
    axios.get(`${baseURL}/3`)
    ])

    console.log(`first pokemon is ${pokes[0].data.name}`)
    console.log(`second pokemon is ${pokes[1].data.name}`)
    console.log(`third pokemon is ${pokes[2].data.name}`)
}
getThreePokemonParallelPromiseAll();