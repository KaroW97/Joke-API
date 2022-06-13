const https = require('node:https');
const { parseData } = require('../utils/supportFunctions')

/**
 * Function check if term was provided and checks its type
 * @param {string} term 
 */
const validateTerm = (term) => {
	if (!term) throw new Error(`Term  has not been provided`)
	if (typeof term !== "string") throw new Error(`Term ${term} is not a string`)
}

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
	headers: { Accept: "application/json" }
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

	let concatedData = ''

	return await new Promise((resolve, reject) => {
		const req = https.request(options, res => {
			res.on('data', data => concatedData += data.toString())

			// When whole data passed resolve the prmise
			res.on('end', () => resolve(parseData(concatedData).results))
		})
		req.on('error', error => reject(error))
		req.end()
	})
}