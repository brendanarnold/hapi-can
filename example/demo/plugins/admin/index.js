
const { data, repositoryItems } = require('./data')
const Can = require('hapi-can')

module.exports = {
  data,
  plugin: {
    name: 'admin',
    register: async (server) => {

      server.register(Can.plugin, {})

      await Can.register(repositoryItems)
      
      server.route([
        {
          method: 'get',
          path: '/admin',
          handler: async (request, h) => {
            const permissions = await Can.from(request).get(data.permissions)
            return `You are ${permissions}`
          }
        }
      ])
    }
  }
}