
const Can = require('hapi-can')
const service = require('./service')

const item = {
  user: Symbol('user'),
  toy: Symbol('toy'),
  food: Symbol('food')
}

const cannedItems = [
  {
    name: item.user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      return service.getUser()
    }
  },
  {
    name: item.toy,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      const user = await Can.from(request).get(item.user)
      return service.getFavouriteToy(user.isUserACat)
    }
  },
  {
    name: item.food,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      const user = await Can.from(request).get(item.user)
      return service.getFavouriteFood(user.isUserACat)
    }
  }
]

module.exports = {
  item,
  cannedItems
}
