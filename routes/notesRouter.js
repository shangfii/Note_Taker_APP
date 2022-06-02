//Installing Express module and a Router from Express
const express = require("express");
const router = express.Router();

//Destructuring module fsUtils. Using functions 

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
      res.json(`Note Taken successfully :)`);
    } else {
      res.error('Error in adding note');
    }
});

// Delete Route for deleting a specific note

router.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);

    const id = req.url;
    
    const requestID = id.slice(1);
        
    // console.log(id) to verify
    console.log(requestID);

    if(req.body) { 
        deleteID(requestID,'./db/db.json');
        res.json(`Note has been deleted`);
    } else {
      res.error('Error Could note deleting note');
    }
});

module.exports = router