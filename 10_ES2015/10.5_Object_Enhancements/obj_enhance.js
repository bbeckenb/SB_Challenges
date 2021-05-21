 //you the function knows you want a 
 //property named whatever the argument is, and includes the val of what is passed in

function makePerson(first, last, age) {
    return {
        first,
        last,
        age, 
        isAlive: true
    }
}

 //you can put methods directly in without naming the property, it will auto-add
 //the property as the function name
 //NOTE you cannot put in arrow functions

 const mathStuff = {
     x: 200,
     add(a,b) {
         return a+b;
     },
     square(a) {
         returna ** 2;
     }
 }

//EXERCISE 10.5
function createInstructor(firstName, lastName){
    return {
      firstName,
      lastName
    }
  }

  var favoriteNumber = 42;

  var instructor = {
    firstName: "Colt",
    [favoriteNumber]: 'that is my favorite!'
  }


  var instructor = {
    firstName: "Colt",
    sayHi() {
      return "Hi!";
    },
    sayBye() {
      return this.firstName + " says bye!";
    }
  };

  const animalCreator = (species, verb, noise) => {
      return {
          species,
           [verb]() {
              return noise;
          }
      }
  };

  const d = animalCreator('dog', 'bite', 'grrrrrrrr');