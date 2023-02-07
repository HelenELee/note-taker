//set up importsimports
const note = require('express').Router();
//functions for reading and writing to json file
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
//used to create unique ID
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);

  readFromFile('./db/db.json')
  .then((data) => {
    //console.info(data);
    if(data.length == 0) {
      res.send("Empty file");
    } else {
      JSON.parse(data);
      res.json(JSON.parse(data)); 
    }
       
  })
  .catch((err) => console.info(err))
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
    //read data from file, append new object and write data back to file
    readAndAppend(newNote, './db/db.json');
    //setup response object and return 
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
    
  } else {
    res.json('Error in posting note');
  }
});

//DELETE route, expects id of note to delete
note.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`);
 
  const idToRemove = req.params.id;
  //check id passed in route URL
  if (idToRemove) {
    readAndDelete(idToRemove, './db/db.json');
    //return success
    const response = {
      status: 'success',
    };

    res.status(400).json(response);
    
  } else {
    res.status(400).send("no id given");
  }

});

module.exports = note;
