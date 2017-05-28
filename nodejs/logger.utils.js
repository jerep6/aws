'use strict';
const winston = require('winston'),
  config = require('./config'),
  WinstonFirehose = require('winston-firehose'),
  _ = require('lodash');

const logger = new winston.Logger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
  },
  colors: {
    trace: 'gray'
  },
  transports: [],
  exitOnError: false
});

if (config.log.console.use) {
  console.log('Use console logger');
  logger.add(winston.transports.Console, {
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: 'trace',
      timestamp: () => new Date().toISOString(),
      colorize: true
    }
  );
}

if (config.log.fluentd.use) {
  console.log('Use log_fluentd logger');
  logger.add(require('winston-fluent').Fluent, {
    level: 'debug',
    tag: 'xebia',
    label: "nodejs",
    options: {
      host: config.log.fluentd.host,
      port: config.log.fluentd.port
    }
  }, false);
}

if (config.log.firehose.use) {
  console.log('Use log_firehose logger');
  logger.add(WinstonFirehose, {
    streamName: config.log.firehose.stream,
    firehoseOptions: {
      region: config.log.firehose.region
    }
  }, false);
}


module.exports = logger;
