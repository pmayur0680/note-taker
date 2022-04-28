// Importing File System module
const fs = require('fs');
// Importing Utilities module
const util = require('util');
// Use promisify to convert fs.readFile to 
// promise based method
const readFromFile = util.promisify(fs.readFile);

module.exports = { readFromFile };