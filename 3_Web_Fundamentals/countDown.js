
// function countDown(num) {
   
//     for (let i = num; i > 0; i--) { //creates timer events to output a decremented series of numbers once per second starting with the initial input
//         setTimeout(function() { //uses an anonymous function to send the current index value to the console
//             console.log(i) 
//         }, (num+1-i)*1000); //Sets the time for the highest number to the shortest time out (1 second), then the decremented number a second later and so on to 0
//     }
//     setTimeout(function() { //Creates the "DONE!" output for 1 second past the output of the last timer created by the above for loop
//         console.log("DONE!");
//     },(num+1)*1000)
// }

function countDown(time){
    let timer = setInterval(function(){
      if(time <= 0){
        clearInterval(timer);
        console.log('DONE!');
      }
      else {
        console.log(time);
        time--;
      }
  
    },1000)
  }

countDown(10); //an example of the code using a counter value of 10







