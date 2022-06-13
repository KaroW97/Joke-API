const { callApi } = require('../api/callJokeApi')
const { checkIfFileExists, getRandomJoke } = require('../utils/supportFunctions')
const { createFile, recordCheck } = require('../utils/recordUtils')

/**
 * Main function for coordintating calls to joke API, creating new file or overwriting it
 * @param {string} term - searching joke topick
 */
exports.jokeHandler = async (term) => {
  let randomJoke
  try {
    //call joke Api
    const jokes = await callApi(term)

    if (!jokes.length) {
      console.log('\x1b[31m%s\x1b[0m', `No joke had been found for given term: '${term}'`)
      return
    }

    // Whene there is more jokes then one choose random
    if (jokes.length > 1) randomJoke = getRandomJoke(jokes)

    // Check if file exists
    const fileExists = await checkIfFileExists()

    // If there is no file create new one
    if (!fileExists) await createFile(randomJoke ?? jokes[0])
    else await recordCheck(randomJoke ?? jokes[0])

  } catch (error) {
    throw new Error(error)
  }
}