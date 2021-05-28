//API = Application Programming Interface
//Includes methods to interface with platforms
//Simple window into functionality
//Third Party APIs, allow us to access data/ perform actions 
//through other platforms
//A lot require authentification, some require $
//twilio lets you send a msg or call to whoever thru JS

//web APIs allow our code to interface with another application
//Data formats, make HTTP requests, get HTML back
//90% of web apps use JSON - Javascript object notation
//need double quotes for JSON

/*API Documentation
Usually a Base URL
*/

//AJAX make requests through JS
//Asynchronous JS and XML
//XML used to be the main data transfer
//Don't have to refresh the page, happening while original content is still there
//Doesn't have to be a click, can be a timer to get new data
//AJAX w/ Axios

//Get Axios script CDN Link: <script src="https://unpkg.com/axios/dist/axios.js"></script>

// const response = axios.get('https://icanhazdadjoke.com/');
// console.log(response);
//get a promise, hands request to browser and makes callback
//Can wait until we get data back
//Async and await solve our issues
// async function getData() {
//     const response = await axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2");
//     console.log(response.data);
//    for (fact of response.data) {
//        console.log(fact.text);
//    }
// }

// getData();

async function spacexLaunches() {
    const response = await axios.get("https://api.spacexdata.com/v3/launches/upcoming");
    addLaunchesToList(response.data)
    
}

function makeLaunchLi(launch) {
    const newLi = document.createElement('li');
    const boldText = document.createElement('b');
    boldText.innerText = launch.mission_name;
    newLi.append(boldText);
    newLi.innerHTML += ` - ${launch.rocket.rocket_name}`;
    return newLi;

}

function addLaunchesToList(launches) {
    const launchInfoList = document.querySelector('#launches');
    for (let launch of launches) {
        launchInfoList.append(makeLaunchLi(launch));
    }
}


const launchInfoButton = document.querySelector('#spacexLaunches');
launchInfoButton.addEventListener('click', spacexLaunches);

async function getRandomDog() {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(res.data);
    const img = document.querySelector('#dog');
    img.src = res.data.message;
}

//getRandomDog();

async function getDogByBreed(breed) {
    try {
        const url = `https://dog.ceo/api/breed/${breed}/images/random`;
        const res = await axios.get(url);
        const img = document.querySelector('#dog');
        img.src = res.data.message;
    } catch (e) {
        alert('Breed not found');
    }
    
}

//getDogByBreed('dachshund');

//methods w/ Axios
//can add resource and params

async function getJoke(firstName, lastName) {
    let res = await axios.get('http://api.icndb.com/jokes/random', { params: {firstName, lastName}});
    console.log(res.data.value.joke);
}

//getJoke("Butters", "Steele");

//Making a post request
async function getUsers() {
    const res = await axios.get('https://reqres.in/api/users');
    console.log(res);
}

//change axios method to post, send parameters associated w/ API
async function createUser() {
    const res = await axios.post('https://reqres.in/api/users', {username: 'buttersTheChicken', email: 'butters@gmail.com'});
    console.log(res);
}
//response of 201 means 'created'
//getUsers();

//createUser();

//can't create post req in certain situations because we don't have 
//authentication, so we need a token, read API for instructions
//Hack-or-snooze is made up API by Colt, will be available in next exercise
async function getUsersHN(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', {param: {token}});
    console.log(res);
}

async function signUp(username, password, name) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', 
    {user: {username, password, name}});
    console.log(res);
}

async function login(username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/login', 
    {user: {username, password}});
    console.log(res);
    return res.data.token;
}

async function getUsersWithAuth() {
    const token = await login('beanDogger', '441ythks3');
    getUsersHN(token);
}
//getUsersHN();
//signUp('beanDogger', '441ythks3', 'catalonia4');
//login('beanDogger', '441ythks3');

//getUsersWithAuth(); 
