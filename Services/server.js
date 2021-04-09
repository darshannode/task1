// PARSE .ENV
require('dotenv').config();

// FOR SERVER
// CHECK WITH PROTOCOL TO USE
const SHOULD_RUN_ON_HTTP = process.env.SHOULD_RUN_ON_HTTP;
const http = (SHOULD_RUN_ON_HTTP == 'true') ? require('http') : require('https');

const express = require('express') // NODE FRAMEWORK
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
const fs = require('fs');


// ---------------------------    SERVER CONFIGS ----------------------------------
// SSL CONFIG
const options = {
    key: fs.readFileSync(__dirname + '/SSL/key.pem'),
    cert: fs.readFileSync(__dirname + '/SSL/cert.pem')
};
const port = process.env.PORT || 8000
const app = express();
require('./Configs/globals'); // GLOBAL SETTINGS FILES
// require('./Database/Dataset/dataset');

const server = (SHOULD_RUN_ON_HTTP == 'true') ? http.createServer(app) : http.createServer(options, app);


// --------------------------   LANGUAGE    ----------------------------------------
// Define unique Key - pair in Locales / Messsages.js
// It will add entry in respective json files
/* By default language is set to english  User can change by  passing  language in
    Header :
    Accept-Language : 'en'
    Query : 
    url?lang=en
*/
const language = require('i18n');
language.configure({
    locales:['en'],
    defaultLocale : 'en',
    autoReload  : true,
    directory   : __dirname + '/Locales',
    queryParameter  : 'lang',
    objectNotation : true,
    syncFiles   : true,
});


// ------------------------      GLOBAL MIDDLEWARES -------------------------
app.use(bodyParser.json()) // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: false })) // ALLOW URL ENCODED PARSER
app.use(cors()) // ALLOWED ALL CROSS ORIGIN REQUESTS
app.use(express.static(__dirname + '/Assets')); // SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(language.init); // MULTILINGUAL SETUP


// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})


// --------------------------    ROUTES    ------------------
const appRoutes = require('./Routes')
appRoutes(app)


// --------------------------    GLOBAL ERROR HANDLER    ------------------
app.use ((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.handler.serverError(err)
})


// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
    console.log(chalk.greenBright(`\nServer started on ${chalk.white.bold(port)} :) \n`))
})