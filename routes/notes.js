const route = require('express').Router();
const {
    readFromFile
} = require('../helpers/fsUtils');

// Route for retrieving all notes
route.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
})

module.exports = route;