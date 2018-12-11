
const service = require('./service')

const plugin = {
  name: 'common',
  register: async (server) => {
    server.decorate('request', 'getService', () => service)
  }
}


module.exports = {
  plugin
}