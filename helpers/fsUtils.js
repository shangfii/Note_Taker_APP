// Installing Express modules required for code
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
 *  Function to read data from a given file and append some content
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
 *  Function to remove object/specific note with ID from a given file
 *  @param {string} id The content you want to delete from the file.
 *  @param {string} file The path to the file you want to modify.
 *  @returns {void} Nothing
 */
const deleteID = (id, file)=> {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // console.log(data);
      const parsedData = JSON.parse(data);
      // console.log(parsedData);
      //Use .some to see if db contians an obj that matches "id" (true or false)
      const found = parsedData.some(obj => obj.id === id);
      // console.log(found);

      if(!found){
        console.error(err)
      } else{
        // Using .filter to create new array without the obj that matched the 'id' argument
        newData = parsedData.filter(obj => obj.id !== id);
        writeToFile(file, newData);
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteID };