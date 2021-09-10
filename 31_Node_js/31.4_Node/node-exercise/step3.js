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

function catWrite(path, content) {
    try {
        fs.writeFileSync(path, content);
        console.log('Successfully wrote to file!');
      } catch (err) {
            throw `Error: ENOENT: no such file or directory, write to ${path}`;
      }
}

function cat(path, write=false) {
    try {
        let contents = fs.readFileSync(path, 'utf8');
        if (write) {
            catWrite(writePath, contents);
        } else {
            console.log(contents);
        }
    } catch (err) {
        throw `Error: ENOENT: no such file or directory, open ${path} - ${err}`;
        
    }
}

async function webCat(URL, write=false) {
    try {
        let res = await axios.get(URL)
        if (write) {
            catWrite(writePath, res.data);
        } else {
            console.log(res.data);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

let writecontent = '';
let outOrToRead = process.argv[2];
let toRead = process.argv[3];
let writePath = process.argv[4];

if (outOrToRead === '--out') {
    if(!pathIsTxtFile(toRead)) {
        webCat(toRead, true);
    } else {
        cat(toRead, true);
    }
} else {
    if(!pathIsTxtFile(outOrToRead)) {
        webCat(outOrToRead);
    } else {
        cat(outOrToRead);
    }
}


