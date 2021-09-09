
// Promises = one-time guarantee of a future value

// axios is a promise based library

// promises in JS are objects
// They are native to the language as of ES2015
// -Need to be able to act upon different items returned from the object
//     -pending = it doesn't have a value yet
//     -resolved = it has successfully obtained a value
//     -rejected = it failed to obtain a value for some reason
// Promises provide a .then and .catch, which both accept callbacks
//     -the callback to .then will run if the promise is resolved, and has access to the promise's resolved value


// let url_1 = "https://swapi.dev/api/planets/1/";
// let ourFirstPromise = axios.get(url_1);
// console.log("Request has been sent!")
// ourFirstPromise.then(res => console.log(res.data));
// ourFirstPromise.catch(err => console.log("REJECTED!!!", err));
// console.log("I am the last line")

// let url_1 = "https://swapi.dev/api/planets/1/"
// axios.get(url_1)
//     .then(res => {
//         console.log(res)
//         axios.get(axios.data.residents[0])
//             .then(res => [
//                 console.log(res)
//             ])
//             .catch(err => [
//                 console.log("ERROR!!!", err)
//             ])
//     })
//     .catch(err => console.log("REJECTED!!", err))

//PROMISE CHAINING
// let url_1 = "https://swapi.dev/api/planets/1/"
// axios.get(url_1)
//     .then(res => {
//         console.log("FIRST PROMISE RESOLVED!")
//         console.log(res)
//         return axios.get(res.data.residents[0])
//     })
//     .then(res => {
//         console.log("SECOND PROMISE RESOLVED!")
//         console.log(res.data)
//         return axios.get(res.data.films[0])
//     })
//     .then(res => {
//         console.log("THIRD PROMISE RESOLVED!")
//         console.log(res.data)
//     })
//     .catch(err => console.log("REJECTED!!", err))


// function wait3Seconds() {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 3000)
//     })
// }

// wait3Seconds()
//     .then(() => console.log("All Done!"))
//     .catch(() => console.log("ERROR!"))

const h1 = document.querySelector('h1')
// setTimeout(function () {
//     h1.style.color = 'red'
//     setTimeout(() => {
//         h1.style.color = 'orange'
//         setTimeout(() => {
//             h1.style.color = 'yellow'
//             setTimeout(() => {
//                 h1.style.color = 'green'
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// PROMISE FUNCTION STRUCTURE
// function changeColor(elem, color) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             elem.style.color = color
//             resolve()
//         }, 1000)
//     })
// }

// changeColor(h1, 'teal')
//     .then(() => changeColor(h1, 'orange'))
//     .then(() => changeColor(h1, 'yellow'))
//     .then(() => changeColor(h1, 'green'))
//     .then(() => changeColor(h1, 'blue'))
//     .then(() => changeColor(h1, 'indigo'))
//     .then(() => changeColor(h1, 'violet'))

let mockAjaxRequest = new Promise(function (resolve, reject) {
    let probSuccess = 0.5;
    let requestTime = 1000;
    setTimeout(function () {
        let randomNum = Math.random();
        if (randomNum < probSuccess) {
            let data = "here's your data";
            resolve(data);
        } else {
            reject("Sorry, your request FAILED")
        }
    }, requestTime)
});

// returns the same because it is ONE promise and it is already resolved
mockAjaxRequest 
    .then(data => {
        console.log(data);
        return mockAjaxRequest
    })
    .then(data => {
        console.log(data);
        return mockAjaxRequest
    })
    .then(data => {
        console.log(data);
        return mockAjaxRequest
    })
    .catch(err => console.log(err))

function mockAjaxRequest1() {
    return new Promise(function (resolve, reject) {
        let probSuccess = 0.5;
        let requestTime = 1000;
        setTimeout(function () {
            let randomNum = Math.random();
            if (randomNum < probSuccess) {
                let data = "here's your data";
                resolve(data);
            } else {
                reject("Sorry, your request FAILED")
            }
        }, requestTime)
    })
}
    
    mockAjaxRequest1() 
        .then(data => {
            console.log(data);
            return mockAjaxRequest1()
        })
        .then(data => {
            console.log(data);
            return mockAjaxRequest1()
        })
        .then(data => {
            console.log(data);
            return mockAjaxRequest1()
        })
        .catch(err => console.log(err))

/* Promise.all, accepts an array of promises and returns a new promise
    This new promise will resolve when every promise in the array resolves,
    and will be rejected if any promise in the array is rejected
    Promise.all is extremely useful whenever you want to send out several independent requests in parallel 
    */ 

//     let fourPokePromises = [];

//     for (let i=1; i<5; i++) {
//         fourPokePromises.push(
//             axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//         );
//     }

//     // fourPokePromises.push(axios.get('njsdbjhdhsbds'))
//  //if it receives one rejection, the batch is rejected
//     Promise.all(fourPokePromises)
//         .then(pokemonArr => {
//             for (res of pokemonArr) {
//                 console.log(res.data.name)
//             }
//         })
//         .catch(err => console.log(err));

/* Promise.race - accepts an array of promises and returns a new promise
    This new promise will resolve or reject as soon as one promise in the array resolves or rejects */ 

    let fourPokePromisesRace = [];

    for (let i=1; i<5; i++) {
        fourPokePromisesRace.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        );
    }

    Promise.race(fourPokePromisesRace)
        .then(res => {
            console.log(`${res.data.name} won the race!`)
        })
        .catch(err => {
            console.log(err)
        })