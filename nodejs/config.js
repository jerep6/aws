module.exports = {
  log: {
    console: {
      use: true,
    },
    fluentd: {
      use: false,
      host: process.env.FLUENTD_HOST || 'URL_ELB',
      port: process.env.FLUENTD_PORT || 24224
    },
    firehose: {
      use: true,
      stream: "LogsToElasticsearch",
      region: "eu-west-1"
    }
  }
};