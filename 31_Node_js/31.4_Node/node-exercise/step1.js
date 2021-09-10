const fs = require('fs');

function cat(path) {
    try {
        let contents = fs.readFileSync(path, 'utf8');
        console.log(contents);
    } catch (err) {
        throw `Error: ENOENT: no such file or directory, open ${path}`
    }
}
cat(process.argv[2])
