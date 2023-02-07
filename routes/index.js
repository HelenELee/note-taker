//set up routes in a modular way so its easy to add new routes for 
//different functionality later
const express = require('express');
//create router for /api/notes
const notesRouter = require('./notes');

const app = express();
//middleware to use notesRouter
app.use('/notes', notesRouter);

module.exports = app;