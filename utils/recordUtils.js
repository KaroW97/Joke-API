const {
	sortElements,
	createRecord,
	readFile,
	writeFile
} = require('./supportFunctions')

/**
 * Create new json file
 * @param {Record<string, string>} data - data to write in new file
 */
const createFile = async (data) => {
	// Create record for the file
	const record = createRecord(data)

	// Write data in the file
	await writeFile(record)
}

/**
 * Function adds new record and writes it to the file
 * @param {Record<string, Record<string, string | number>} file - curent data in the file
 * @param {Record<string, string> | null} data - new record 
 * @param {Boolean} newRecord - decides if passed record is new or old with only updated "repetitions" field
 */
const appendToFile = async (file, data = {}, newRecord) => {
	// Create object considered as new file data
	const json = {
		...file,
		...newRecord ? createRecord(data) : data
	}

	// Sort data to find the most popular one 
	const sortedRecords = sortElements(json)

	// Write data in the file
	await writeFile(json, false, sortedRecords)
}

/**
 * Function checks if provided data already exists in the file or nit
 * If not creates new record
 * If does increment repetitions field
 * @param {Record<string, string>} data - data found by joke API
 */
const recordCheck = async (data) => {
	// Get file data
	const parsedData = await readFile()

	// Check if provided data already exists
	const dataExists = parsedData[data.id]

	// If does increment repetitions
	if (dataExists)
		dataExists.repetitions++

	// If data dosnt exist set flat to true to create New record
	const createNewRecord = !dataExists ? true : false

	// If data dosnt exist pass assign data to variable 
	const newRecord = !dataExists ? data : null

	// Add data to the file
	appendToFile(parsedData, newRecord, createNewRecord)
}

module.exports = {
	createFile,
	recordCheck
}