module.exports = {
  log: {
    console: {
      use: true,
    },
    fluentd: {
      use: true,
      host: process.env.FLUENTD_HOST || 'url-ELB',
      port: process.env.FLUENTD_PORT || 24224
    }
  }
};