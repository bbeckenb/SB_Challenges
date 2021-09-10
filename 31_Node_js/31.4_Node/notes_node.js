/*
Node is an implementation of JS that runs server side
DOM does not exist in Node.js

WHY use node?
    -the entire stack is one language
    -extensive set of packages/ libraries through npm
    -very common these days, a lot of companies use it
        -break up apps into 'micro-services'
    -very good at handling simultaneous events (like streaming services)
    -electron allow you to run your apps all over the place (web, mac, android, linux, etc.)
    -not ideal for data-science/ high level computation applications

Command Line Commands:
-type 'node' is equivalent to 'ipython' for Python
-can type 'node NODE_FILE_NAME.js' to run the file

NPM = massive registry of add-on libraries
-don't need to venv like with python

Starting project with NPM
-First: cd to proj folder
-npm init, creates 'package.json' with metadata and dependencies
    -package.json is equivalent of requirements.txt for Python
    -packages and their versions
    -will ask questions
    -don't track node_modules directory (like venv folder) git ignore
    -if you don't want to deal with questionaire npm init --yes

clone and run a project
-run npm install, it will grab the package.json and do everything it needs to automatically
-npm start
*/
// how to import libraries
const axios = require('axios');
//  how to import from other files
const { add } = require('./import_func')
// second step is to module.exports = {function: function} for all functions in the file you are importing
console.log(add(3,4));
// adding environmental veriables to shell
//  process.env is an object, its keys are the names of the environment variables
// in command line for project type 'export KEY_NAME='KEY_VALUE''
// view these in shell by typing 'process.env'
// access them in code using syntax below: 
console.log(process.env.SECRET_KEY)

// arg v gives you access to commands you have written in the script
for(let arg of process.argv) {
    console.log(arg)
}
console.log('HIIIIIII');

// process.exit - exit the program immediately and return an exit code to the shell
process.on('exit', function(code) {
    console.log(0)
})
/**
 * The Modeule system
    * Modules are the way to share code across different files in a Node project
    * System called CommonJS Modules 
    * No script tage in the Node Ecosystem so you have to include other files by exporting/ importing them explicitly     
 */

/*
File System Module
fs
The fs module is built-in and provides an interface to your local file system.

It is commonly used to read and write files.
To start using it, const fs = require('fs'); (no installation necessary).
Reading Files
The default method for reading files is asynchronous, using a callback.

fs.readFile(path, encoding, callback)

path: path to file (relative to working directory)
encoding: how to interpret file
for text files, this is almost always “utf8”
for binary files (like an image), omit this argument
callback: function that takes error and data
*/

 const fs = require('fs');

 fs.readFile('myFile.txt', 'utf8', function(err, data) {
   if (err) {
     // handle possible error
     console.error(err);
     // kill the process and tell the shell it errored
     process.exit(1);
   }
   // otherwise success
   console.log(`file contents: ${data}`);
 });
 
 console.log('reading file');
 // file won't have been read yet at this point