// const { expect } = require('code')
const { describe, it } = exports.lab = require('lab').script()

describe('Can.plugin', async () => {
  describe(`onPreStart`, async () => {
    it(`should attach the server cache to server.plugins['hapi-can']`)
    it(`should attach the repositoryItems to server.plugins['hapi-can']`)
    it(`should attach the plugin options to server.plugins['hapi-can']`)
    describe('given repositoryItems with lifespan of the server', () => {
      it('should populate the server cache with a key for each item')
      it(`should fetch each item in the server cache sequentially`)
      it(`should time how long each fetch takes in milliseconds and add it to the cache item as fetchTime`)
      it(`should set the lastFetched time to the current time and add it to the cache item`)
      it(`should set the lastUpdated time to the current time and add it to the cache item`)
      it(`should set isInvalidated to false and add it to the cache item`)
      it(`should set cacheAccess for each cache item to 0`)
      it(`should set fetchAccesses for each cache item to 1`)
    })
  })

  describe('onRequest', async () => {
    it(`should attach the request cache to request.plugins['hapi-can']`)
    it(`should attach the toolkit object to request.plugins['hapi-can']`)
    it(`should attach a new timer as requestTimer to request.plugins['hapi-can']`)
    describe(`Given repositoryItems with lifespan of a request`, async () => {
      it(`should initialise the request cache with each request item in repositoryItems`)
    })
  })

  describe(`onPreResponse`, async () => {
    it(`should log the request time`)
  })
})
