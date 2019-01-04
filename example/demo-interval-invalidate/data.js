
const { item } = require('./canned-service')
const Can = require('hapi-can')

const getUser = async (request) => {
  const user = await Can.from(request).get(item.user)
  return user
}

module.exports = {
  getUser
}
