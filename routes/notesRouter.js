//Installing Express module then a Router from Express
const express = require("express");
const router = express.Router();

//Destructuring module fsUtils. Using only necessary functions 
const { readFromFile, readAndAppend, deleteID } = require('../helpers/fsUtils');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// GET Route for retrieving all saved notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  
// POST Route for adding new note
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  // Destructuring req.body
    const {title, text} = req.body;
  
    if (req.body) {
      // Creating new object with new note information
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

// Delete Route for deleting a specific note
router.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);

    // const id2 = req.params.id; 
    // console.log(id2);
    
    const id = req.url;
    // removing "/" from ID sent in 'req'
    const requestID = id.slice(1);
        
    // console.log(id);
    console.log(requestID);

    if(req.body) { 
        deleteID(requestID,'./db/db.json');
        res.json(`Note successfully deleted`);
    } else {
      res.error('Error in deleting note');
    }
});

module.exports = router