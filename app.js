
const { jokeHandler } = require('./handlers/findJoke');
const { mostPopularhandler } = require('./handlers/mostPopular')

const FLAGS = {
  searchTearm: '--searchTearm',
  leaderboard: '--leaderboard'
}

/**
 * 
 * @param {string} flag - values contained in validFlags array, flag determinise which functionality should be called
 * @param {string} term - term which will be searched
 */
const validateInputs = (flag, term) => {
  const validFlags = ['--searchTearm', '--leaderboard']

  // When there is no flag throw
  if (!flag) throw new Error(`No flag provided. Accepted flags: ${validFlags}`)

  // When provided flag is not in the scope
  if (!validFlags.includes(flag))
    throw new Error(`The flag: ${flag} is not accepted. Accepted flags: ${validFlags}`)

  // When flag is --searchTearm yet the searching term is not given
  if (flag === FLAGS.searchTearm && !term)
    throw new Error(`No searching tearm has been provided`)
}

/**
 * General function responsible for coordinating calls 
 * between "handler" and "getMostPopular" functions
 * @param {string[]} param0 - Array with flag name and searched params
 */
exports.invoke = async ([flag, term]) => {
  //validate inputs
  validateInputs(flag, term)

  // When flag is searchTearm call joke API
  if (flag === FLAGS.searchTearm)
    jokeHandler(term)

  // When flag is leaderboard read file and find most popular joke
  if (flag === FLAGS.leaderboard) {
    const test = await mostPopularhandler()
    process.stdout.write(test + '\n')
  }
}
