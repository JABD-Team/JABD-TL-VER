//load package
global.package = require("./package.json")
console.log("Starting JABD Bot Version " + global.package.version +"...")
//load config
global.config = require("./createconfig.js")()
//load data
global.data = require("./getdata.js")()
//login
const login = require("./login.js");