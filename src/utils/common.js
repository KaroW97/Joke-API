const fs = require('fs')
const FILE_NAME = 'jokes.json'

const FLAGS = {
  searchTearm: '--searchTearm',
  leaderboard: '--leaderboard'
}

/**
 * Function checks if asked file exists
 * If no returns false
 * If yes returns true
 * @returns {Promise<boolean>}  boolean that determines whether the file exists
 */
const checkIfFileExists = async () => {
  try {
    await fs.promises.access(FILE_NAME)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Function parse data to json from Buffer
 * @param {Buffer} data
 * @returns {JSON}
 */
const parseData = (data) => JSON.parse(data.toString())

/**
 * @returns {Promise<JSON>} Data from read file
 */
const readFile = async (id) => {
  let data = ''
  const CHUNK_SIZE = 10000000 //10MB

  const stream = fs.createReadStream(FILE_NAME, { highWaterMark: CHUNK_SIZE })

  return new Promise((resolve, rejects) => {
    stream.on('data', (chunk) => (data += chunk.toString()))

    stream.on('end', () => {
      let parsed = parseData(data)

      // Check if provided data already exists
      if (parsed[id])
        // If does increment repetitions
        parsed[id].repetitions++

      resolve({ parsed, isRepeated: !!parsed[id] })
    })
    stream.on('error', (error) => rejects(error))
  })
}

/**
 * Function writes file with new elements
 * @param {Record<string, Record<string, string | number>} jsonFile - new data for the file
 * @param {Boolean} initilTopRecord - decides if performed action is initial
 * @param {Record<string, Record<string, string | number>} newTopRecord - new top record
 */
const writeFile = async (jsonFile, initilTopRecord = true, newTopRecord) => {
  const json = JSON.stringify({
    ...jsonFile,
    top: initilTopRecord ? jsonFile : newTopRecord
  })

  fs.createWriteStream(FILE_NAME).write(json)
}

module.exports = {
  checkIfFileExists,
  parseData,
  readFile,
  writeFile,
  FLAGS
}
