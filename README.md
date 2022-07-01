# Joke-API
### A small application with two functionalities:
* The first is to call Joke API and write a new joke to "joke.json" file.
* The second is to print the most popular joke.

### The project contains basic error handling
* SupportFunctions.js file contains all functions used across the project.
* recordUtils.js is responsible for maintaining actions on record data.
* mostPopular.js is returning the most popular element in the file.
* callJokeApi.js is dose simple input validation and calls joke API.
* findJoke.js is a handler responsible for managing data from CallJokeApi.js, creating new records, updating and creating file.
* app.js decides which function should be called based on given data. Contains input validation.
* main.js Main function responsible for invoking app.js function.

### How to call
*  npm run joke -- --searchTearm hipster
*  npm run joke -- --leaderboard