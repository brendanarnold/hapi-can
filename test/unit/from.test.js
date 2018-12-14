
const { expect } = require('code')
const { describe, it } = exports.lab = require('lab').script()
const { _buildBaseServer } = require('../_testUtils')

// System under test
const { from } = require('../../lib/from')

describe('Can.from()', async () => {
  describe('Given a server like object', async () => {
    it('should return an object', async () => {
      const res = from(_buildBaseServer())
      expect(res).to.be.object()
    })

    describe(`and get() is called on the result`, async () => {
      describe(`with no parameters`, async () => {
        it('should raise an Error')
      })

      describe(`with an name that isn't in the cache`, async () => {
        it('should raise an Error')
      })

      describe(`with a name in the cache`, async () => {
        it('should return the value of the cache')
        it('should bump the cacheAccesses value by 1')
        describe('and the cache has been invalidated', async () => {
          it('should call the fetch function for the item with any extra parameters')
          it('should set the fetchTime value for the cache')
          it('should not change the cacheAccesses value')
          it('should update the lastUpdated value')
          it('should update the lastFetched value')
          it('should set the isInvalidated flag to false')
        })
      })
    })

    describe(`and lastFetched() is called on the result`, async () => {
      describe('and the cache has not yet been fetched', async () => {
        it('should return undefined')
      })
      describe('and the cache has been fetched', async () => {
        it('should return the UNIX timestamp for when the value was last fetched')
      })
    })

    describe(`and lastUpdated() is called on the result`, async () => {
      describe('and the cache has not yet been fetched', async () => {
        describe('and the value has not been set explicitly with set()', async() => {
          it('should return undefined')
        })
        describe('and the value has been set explicitly with set()', async() => {
          it('should return the UNIX timestamp for the update time')
        })
      })
      describe('and the cache has been fetched', async () => {
        describe('and the value has not been set explicitly with set()', async () => {
          it('should return the UNIX timestamp for the update time')
        })
        describe('and the value has been set explicitly with set()', async() => {
          it('should return the UNIX timestamp for the latest of the two')
        })
      })
    })

    describe('and isInvalidated() is called on the result', async () => {
      describe('and the item has been invalidated', async () => {
        it('should return true')
      })

      describe('and the item has not been invalidated', async () => {
        it('should return false')
      })
    })

    describe('and invalidate() is called on the result', async () => {
      describe('and an invalid name is passed as an argument', async () => {
        it('should throw an error')
      })
      describe('and a valid cache name is passed as an argument', async () => {
        it('should set the isInvalidated flag to true')
        it('should return an object')
        describe('and includingDependencies() is called on the returned object', async () => {
          it('should set the isInvalidated flag to true on the listed dependencies')
          it('should return an object')
          describe('and get() is called on the returned object', async () => {
            it('should return the value named in the parameter for invalidate()')
          })
        })
        describe('and get() is called on the returned object', async () => {
          it('should return the value named in the parameter for invalidate()')
        })
      })
      
    })

    describe('and fetchTime() is called on the result', async () => {
      describe('and there is no parameter', async () => {
        it('should throw an error')
      })

      describe('and a valid cache name is set as the parameter', async () => {
        describe('and the item has not been fetched yet', async () => {
          it('should return undefined')
        })

        describe('and the item has been fetched', async () => {
          it('should return the time it took to fetch the item in milliseconds')
        })
      })
    })

    describe('and set() is called on the result', async () => {
      describe('and no parameters are passed', async () => {
        it('should throw an error')
      })

      describe('and a valid cache name is passed', async () => {
        it('should set the cache value to the new value')
        it('should set isInvalidated to false')
        it('should set lastUpdate to the current time')
      })
    })

    describe('and generateReport() is called on the result', async () => {
      it('should return an object')
      it('should return correct statistics for the current cache as it currently is')
    })
  })

  describe('Given a request like object', async () => {
    it('should return an object')
  })
})
