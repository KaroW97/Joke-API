const { callApi } = require('../api/callJokeApi')
const { checkIfFileExists } = require('../utils/common')
const { createFile, recordCheck } = require('../utils/recordUtils')
const { getJoke } = require('../utils/record')

/**
 * Main function for coordinating calls to joke API, creating new file or overwriting it
 * @param {string} term - searching joke topics
 */
exports.jokeHandler = async (term) => {
  try {
    //call joke Api
    const jokes = await callApi(term)

    if (!jokes.length) {
      console.info(
        '\x1b[31m%s\x1b[0m',
        `No joke had been found for given term: '${term}'`
      )
      return
    }

    // Return random joke if there is more then one
    // Or return the first when the length on
    const joke = getJoke(jokes)

    // Check if file exists
    const fileExists = await checkIfFileExists()

    // If there is no file create new one
    if (!fileExists) await createFile(joke)
    else await recordCheck(joke)
  } catch (error) {
    throw new Error(error)
  }
}
