
const { item } = require('./canned-service')
const Can = require('hapi-can')

const getUser = async (server) => {
  const user = await Can.from(server).get(item.user)
  const greeting = `Hey ${user.name}, here are your favourite things ...`
  return greeting
}

module.exports = {
  getUser
}
