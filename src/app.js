const { jokeHandler } = require('./handlers/findJoke')
const { mostPopularhandler } = require('./handlers/mostPopular')
const { validateInputs } = require('./utils/validation')
const { FLAGS } = require('./utils/common')

/**
 * General function responsible for coordinating calls
 * between "handler" and "getMostPopular" functions
 * @param {string[]} param0 - Array with flag name and searched params
 */
exports.invoke = async ([flag, term]) => {
  //validate inputs
  validateInputs(flag, term)

  // When flag is searchTearm call joke API
  if (flag === FLAGS.searchTearm) jokeHandler(term)

  // When flag is leaderboard read file and find most popular joke
  if (flag === FLAGS.leaderboard) {
    const test = await mostPopularhandler()

    process.stdout.write(test + '\n')
  }
}
