global.chalk = require('chalk'); // FOR COLORED CONSOLES

global.STATUS_CODES = require('./constants').STATUS_CODES;

global.mongoose = require('mongoose');

global.PAGE_SIZE = parseInt(process.env.PAGINATION_PAGE_SIZE);

global.Parallel = require('bluebird').join

require('./Database')