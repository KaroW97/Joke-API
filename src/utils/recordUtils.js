const { readFile, writeFile } = require('../components/common')
const {
  sortElements,
  createRecord,
  createNewJson
} = require('../components/record')

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
 * @param {Record<string, Record<string, string | number>} file - current data in the file
 * @param {Record<string, string>} data - new record
 * @param {Boolean} createNewRecord - decides if passed record is new or old with only updated "repetitions" field
 */
const appendToFile = async (file, data, createNewRecord) => {
  // Create object considered as new file data
  const json = createNewJson(file, data, createNewRecord)

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
  const foundDataById = parsedData[data.id]

  // If does increment repetitions
  if (foundDataById) foundDataById.repetitions++

  // If data doesn't exist pass assign data to variable
  const newRecord = !foundDataById ? data : {}

  // If data doesn't exist set flat to true to create New record
  const createNewRecord = !foundDataById ? true : false

  // Add data to the file
  appendToFile(parsedData, newRecord, createNewRecord)
}

module.exports = {
  createFile,
  recordCheck
}
