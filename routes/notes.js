const route = require('express').Router();
const {
    readFromFile,
    readAndAppend
} = require('../helpers/fsUtils');

// Route for retrieving all notes
route.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
})

// Route to save new note
route.post('/', (req, res) => {
    console.log(req.body); // { title: 'test', text: 'this is a test' }
    // deconstructing 
    const { title, text } = req.body;
    // validate and save to json
    if(req.body) {
        const newNote = {
            title,
            text
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note has been added successfully');
    } else {
        res.error('Error in adding note');
    }

})

module.exports = route;