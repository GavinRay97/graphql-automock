// Set up ESM library to not use nasty Node.js require() import and module.exports syntax
require = require("esm")(module)
module.exports = require("./main.js")