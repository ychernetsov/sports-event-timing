const debug = require('debug')

module.exports = {
  app: loggerFactory('app'),
  db: loggerFactory('db')
}

function loggerFactory(moduleName) {
  return {
    log(msg) {
      debug(moduleName)(msg)
    },
    error(e) {
      const msg = e.message || e.toString()
      debug(moduleName)(msg)
    }
  }
}