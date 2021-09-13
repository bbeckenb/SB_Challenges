/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
    
  }

  makeChains() {
    let chains = {};
    for (let i=0; i<this.words.length; i++) {
      let insertWord = '';
      if (i === this.words.length-1) {
        insertWord = null;
      } else {
        insertWord = this.words[i+1];
      }
      if (this.words[i] in chains) {
        
        chains[this.words[i]].push(insertWord);
      } else {
          chains[this.words[i]] = [insertWord]
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let outputStr = '';
    let randWord = this.words[Math.floor(Math.random() * this.words.length)];

    while (numWords > 0 && randWord !== null) {
      outputStr += randWord + ' ';
      randWord = this.chains[randWord][Math.floor(Math.random() * this.chains[randWord].length)];
      numWords--;
    }
    console.log(outputStr);
    return outputStr
  }
}

// let p = new MarkovMachine("the cat in the hat");
// console.log(p.words);
// console.log(p.chains);
// p.makeText();

module.exports = { MarkovMachine };
