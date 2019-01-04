
const Can = require('hapi-can')
const service = require('./service')

const item = {
  user: Symbol('user')
}

const cannedItems = [
  {
    name: item.user,
    lifespan: Can.lifespan.server,
    fetch: async ({ server }) => {
      return service.getUser()
    },
    invalidate: [
      {
        when: Can.when.interval,
        interval: 5000
      }
    ]
  }
]

module.exports = {
  item,
  cannedItems
}
