const { MarkovMachine } = require("./markov");
const fs = require('fs');
const axios = require('axios')

function handleOutput(text, source, sourceName) {
    const mm = new MarkovMachine(text);
    console.log(`... generated text from ${source} '${sourceName}' ...`);
    console.log(mm.makeText());
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
            if(err) {
                console.error(`Error reading ${path}: ${err}`);
                process.exit(1);
            } else {
                handleOutput(data, 'file', path);
            }
    });           
}

async function webCat(URL) {
    try {
        let res = await axios.get(URL)
            handleOutput(res.data, 'url', URL);
    } catch (err) {
        console.error(`Error fetching ${URL} - ${err}`);
        process.exit(1)
    }
}

let sourceType = process.argv[2];
let toRead = process.argv[3];

if (sourceType === 'file') {
    console.log('IM HERE')
    cat(toRead);
} else if (sourceType === 'url') {
    webCat(toRead);
} else {
    console.error(`Error: Source type ${sourceType} not supported. Please use 'file' or 'url'`)
    process.exit(1);
}