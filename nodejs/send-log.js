const logger = require('./logger.utils');


// Generate data for logging
const err = new Error("No user in database"),
  users = ["A", "B", "C"],
  userId = "XCTYPO-YDGBNC"
  timeToProcess = 87;

logger.info('Number of users readed in database', {count: users.length, duration: timeToProcess, type:'dbread'});
logger.error('Error when insert user into database', {id: userId, error: err.stack, type:'dbread'});

logger.info('Read count='+ users.length+' users in database in duration=' + timeToProcess + 'ms type=dbread');

logger.info(`Read ${users.length} users in database in ${timeToProcess}ms with log type dbread`);
