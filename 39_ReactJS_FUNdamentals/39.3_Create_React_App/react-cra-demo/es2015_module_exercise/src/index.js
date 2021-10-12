import { arrayOfFruits } from "./foods";
import { choice, remove } from "./helpers";

let randFruit = choice(arrayOfFruits);
console.log(`I'd like one ${randFruit}, please.`);
console.log(`Here you go: ${randFruit}`);
console.log(`Delicious! May I have another?`);
let removeFruit = remove(arrayOfFruits, randFruit);
console.log(`I’m sorry, we’re all out of ${removeFruit}. We have ${arrayOfFruits.length} left.`);
