const route = require('express').Router();
// Universally Unique Identifier (UUID) using uuid npm
// Create an RFC version 4 (random) UUID
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile
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
            text,
            id: uuidv4(),
        };
        console.log(newNote);
         readAndAppend(newNote, './db/db.json');
        res.json('Note has been added successfully');
    } else {
        res.error('Error in adding note');
    }

})

// Route to delete note
route.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => {
       const arrayResult = JSON.parse(data);
       const updatedArray = arrayResult.filter((note) => note.id !== id);
       // Save new array to db       
       writeToFile(updatedArray, './db/db.json');
       // Respond to the DELETE request
       res.json(`Selected note has been deleted.`);
    })
    
})
module.exports = route;