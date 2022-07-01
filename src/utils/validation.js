const { FLAGS } = require('./common')

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
    throw new Error(
      `The flag: ${flag} is not accepted. Accepted flags: ${validFlags}`
    )

  // When flag is --searchTearm yet the searching term is not given
  if (flag === FLAGS.searchTearm && !term)
    throw new Error('No searching tearm has been provided')
}

/**
 * Function check if term was provided and checks its type
 * @param {string} term
 */
const validateTerm = (term) => {
  if (!term) throw new Error('Term  has not been provided')
  if (typeof term !== 'string') throw new Error(`Term ${term} is not a string`)
}

module.exports = {
  validateInputs,
  validateTerm
}
