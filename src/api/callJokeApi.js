const https = require('node:https')
const { parseData } = require('../components/common')
const { validateTerm } = require('../utils/validation')

/**
 * Function creates header for https call
 * @param {string} term
 * @returns {Record< string, Record<string, string> | string | number} - https options
 */
const createOptions = (term) => ({
  hostname: 'icanhazdadjoke.com',
  port: 443,
  path: `/search?term=${term}`,
  method: 'GET',
  headers: { Accept: 'application/json' }
})

/**
 * Function calls to joke API and return searched data
 * @param {string} term
 * @returns {Record<string, string>[]}
 */
exports.callApi = async (term) => {
  // Validate term
  validateTerm(term)

  // Create options
  const options = createOptions(term)

  let buffer = ''
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (data) => (buffer += data.toString()))
      // When whole data passed resolve the prmise
      res.on('end', () => resolve(parseData(buffer).results))
    })
    req.on('error', (error) => reject(error))
    req.end()
  })
}
