const { checkIfFileExists, readFile } = require('../utils/common')

/**
 * Function is responsible for returning the most popular joke in the joke.json file
 * @returns string containing joke
 */
exports.mostPopularhandler = async () => {
  try {
    // Check if file exists
    const fileExists = await checkIfFileExists()

    // If there is no file throw error
    if (!fileExists) throw new Error("The file doesn't exist")

    // read file
    const parsedData = await readFile()

    // return top joke
    return JSON.stringify(parsedData['top'])
  } catch (error) {
    throw new Error(error)
  }
}
