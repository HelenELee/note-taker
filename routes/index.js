const express = require('express');

// Import our modular routers for /tips and /feedback
//const tipsRouter = require('./tips');
const notesRouter = require('./notes');

const app = express();

//app.use('/tips', tipsRouter);
app.use('/notes', notesRouter);

module.exports = app;