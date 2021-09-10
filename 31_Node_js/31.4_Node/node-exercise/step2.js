const fs = require('fs');
const axios = require('axios')

// function validURL(str) {
//     let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//       '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//       '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//       '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
//     return !!pattern.test(str);
//   }

function pathIsTxtFile(path) {
    return path.includes('.txt')
}

function cat(path) {
    try {
        let contents = fs.readFileSync(path, 'utf8');
        console.log(contents);
    } catch (err) {
        throw `Error: ENOENT: no such file or directory, open ${path}`
    }
}

async function webCat(URL) {
    try {
        let res = await axios.get(URL)
        console.log(res);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

let argv = process.argv[2];
if(!pathIsTxtFile(argv)) {
    webCat(argv)
} else {
    cat(argv)
}


