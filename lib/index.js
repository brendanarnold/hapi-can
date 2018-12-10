
const plugin = require('./plugin')
const register = require('./register')
const { when, lifespan } = require('./enums')
const { from } = require('./from')

module.exports = {
  plugin,
  register,
  when,
  lifespan,
  from
}
