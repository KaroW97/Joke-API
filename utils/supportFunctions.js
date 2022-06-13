const fs = require('fs');
const FILE_NAME = 'jokes.json'

/**
 * Function sorts to find the most popular joke in the file. 
 * Then returns one element with the grates number
 * @param {Record<string, Record<string, string | number>>} data - data to sort
 * @returns {Record<string, string | number>} Object with the grates number of repetitions
 */
const sortElements = (data) => Object.values(data)
  .sort((prev, element) => element.repetitions - prev.repetitions)[0]

/**
 * Function checks if asked file exists 
 * If no returns false
 * If yes returns true
 * @returns {Promise<boolean>}  boolean that determines whether the file exists
 */
const checkIfFileExists = async () => {
  try {
    await fs.promises.access(FILE_NAME)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Function creates new record for the file
 * @param {Record<string, string>} data 
 * @returns Object containing new record
 */
const createRecord = (data) => ({
  [`${data.id}`]: {
    joke: data.joke,
    repetitions: 1,
  }
})

/**
 * Function finds random joke
 * @param {Record<string, string>[]} jokes 
 * @returns {Record<string, string>}
 */
const getRandomJoke = (jokes) =>
  jokes[Math.floor(Math.random() * jokes.length)]

/**
 * Function parse data to json from Buffer
 * @param {Buffer} data 
 * @returns {JSON}
 */
const parseData = (data) => JSON.parse(data.toString())

/**
 * @returns {Promise<JSON>} Data from read file
 */
const readFile = async () => {
  const file = await fs.promises.readFile(FILE_NAME)
  return parseData(file)
}

/**
 * Function writes file with new elements 
 * @param {Record<string, Record<string, string | number>} jsonFile - new data for the file
 * @param {Boolean} initilTopRecord - decides if pereformed action is initial
 * @param {Record<string, Record<string, string | number>} newTopRecord - new top record
 */
const writeFile = async (jsonFile, initilTopRecord = true, newTopRecord) =>
  fs.promises.writeFile(FILE_NAME, JSON.stringify({
    ...jsonFile,
    top: initilTopRecord ? jsonFile : newTopRecord
  }))

module.exports = {
  sortElements,
  checkIfFileExists,
  createRecord,
  getRandomJoke,
  parseData,
  readFile,
  writeFile
}