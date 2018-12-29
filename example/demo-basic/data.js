
const service = require('./service')
const { item } = require('./canned-service')
const Can = require('hapi-can')

const standard = {
  getGreeting: async () => {
    const user = await service.getUser()
    const greeting = `Hey ${user.name}, here are your favourite things ...`
    return greeting
  },
  getFavouriteThings: async () => {
    const user = await service.getUser()
    const toy = await service.getFavouriteToy(user.isUserACat)
    const food = await service.getFavouriteFood(user.isUserACat)
    return { food, toy }
  }
}

const canned = {
  getGreeting: async (request) => {
    const user = await Can.from(request).get(item.user)
    const greeting = `Hey ${user.name}, here are your favourite things ...`
    return greeting
  },
  getFavouriteThings: async (request) => {
    const user = await Can.from(request).get(item.user)
    const toy = await Can.from(request).get(item.toy, user.isUserACat)
    const food = await Can.from(request).get(item.food, user.isUserACat)
    return { food, toy }
  }
}

module.exports = {
  standard,
  canned
}
