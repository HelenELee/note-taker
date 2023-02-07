const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

/**
 *  Function to read data from a given a file and append some content
 *  @param {string} idToRemove The ID of the entry you want to remove from the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {boolean} True/false depending on whether entry was removed
 */
//function to read existing json file and delete entry based on ID passed in
const readAndDelete = (idToRemove, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      //return false;
    } else {
      const parsedData = JSON.parse(data);
      //filter array of json object by excluding the one with the ID passed into function
      const newData = parsedData.filter((item) => item.id != idToRemove);
      writeToFile(file, newData);
      //check if item was deleted
      if (parsedData.length > newData.length) {
        console.info("deleted note");
      } else {
        console.info("note not found in db!!!");
      }
      
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
