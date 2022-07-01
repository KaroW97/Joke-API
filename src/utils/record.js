/**
 * Function sorts to find the most popular joke in the file.
 * Then returns one element with the grates number
 * @param {Record<string, Record<string, string | number>>} data - data to sort
 * @returns {Record<string, string | number>} Object with the grates number of repetitions
 */
const sortElements = (data) =>
  Object.values(data).sort(
    (prev, element) => element.repetitions - prev.repetitions
  )[0]

/**
 * Function finds random joke if length of the array is grater then 1
 * Else return the first element from the array
 * @param {Record<string, string>[]} jokes
 * @returns {Record<string, string>}
 */
const getJoke = (jokes) => {
  if (jokes.length <= 1) return jokes[0]

  return jokes[Math.floor(Math.random() * jokes.length)]
}

/**
 * Function creates new record for the file
 * @param {Record<string, string>} data
 * @returns Object containing new record
 */
const createRecord = (data) => ({
  [`${data.id}`]: {
    joke: data.joke,
    repetitions: 1
  }
})

/**
 * Function creates new JSON file based on provided data
 * If createNewRecord is TRUE new data is being created
 * If it is FALSE empty object is passed
 * @param {Record<string, string | number>} file
 * @param {Record<string, string} data
 * @param {Boolean} createNewRecord
 * @returns {Record<string, string | number>}
 */
const createNewJson = (file, data, createNewRecord) => ({
  ...file,
  ...(createNewRecord ? createRecord(data) : data)
})

module.exports = {
  sortElements,
  getJoke,
  createRecord,
  createNewJson
}
