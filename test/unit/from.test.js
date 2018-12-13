
const { expect } = require('code')
const { describe, it } = exports.lab = require('lab').script()
const { _buildBaseRequest, _buildBaseServer } = require('../_testUtils')

// System under test
const { from } = require('../../lib/from')

describe('Can.from()', async () => {
  describe('Given a server like object', async () => {
    it('should return an object', async () => {
      const res = from(_buildBaseServer())
      expect(res).to.be.object()
    })

    describe(`and get is called on the result`, async () => {
      describe(`with no parameters`, async () => {
        it('should raise an Error')
      })
    })
  })


})
