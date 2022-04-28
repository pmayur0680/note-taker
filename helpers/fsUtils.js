// Importing File System module
const fs = require('fs');
// Importing Utilities module
const util = require('util');
// Use promisify to convert fs.readFile to 
// promise based method
const readFromFile = util.promisify(fs.readFile);
// Function to read data from a given file and append new record
const readAndAppend = (newContent, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(!err) {
            const fileData = JSON.parse(data);
            fileData.push(newContent);
            fs.writeFile(file, JSON.stringify(fileData), (err) => {
                err ? console.error(err) : console.info(`New record has been added to ${file}`) 
            })
        }
        else {
            console.error(err);
        }
    })
}
// Function to write data to JSON file
const writeToFile = (newContent, file) => {
    fs.writeFile(file, JSON.stringify(newContent), (err) => {
        err ? console.error(err) : console.info(`Data has been written to ${file}`) 
    })
}
module.exports = { readFromFile, readAndAppend, writeToFile };