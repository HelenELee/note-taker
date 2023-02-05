const note = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);

  readFromFile('./db/db.json')
  .then((data) => {
    res.json(JSON.parse(data));
  })
});

// POST Route for submitting note
note.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);
  
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(), //generate unique id
    };
    
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
    
  } else {
    res.json('Error in posting note');
  }
});

note.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`);
 
  const idToRemove = req.params.id;

  if (idToRemove) {
    readAndDelete(idToRemove, './db/db.json');

    const response = {
      status: 'success',
     // body: idToRemove,
    };

    res.json(response);
  } else {
    res.json('Error in deleting note');
  }


  //res.json(`DELETE route`)
});

module.exports = note;
