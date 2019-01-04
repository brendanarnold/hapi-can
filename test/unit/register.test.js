// const { expect } = require('code')
const { describe, it } = exports.lab = require('lab').script()
// const { _buildBaseServer } = require('../_testUtils')

// System under test
// const register = require('../../lib/register')

describe('Can.register()', async () => {
  describe('Given that an invalid register object is passed in', async () => {
    it('should throw an error')
  })

  describe('Given that a valid registration with a lifespan of the server is passed in', async () => {
    it('should add it to the repositoryItems object under server')
  })

  describe('Given that a valid registration with a lifespan of a request is passed in', async () => {
    it('should add it to the repositoryItems object under request')
  })
})
