
const _buildBaseToolkit = () => ({
  realm: {
    pluginOptions: {}
  }
})

const _buildBaseServer = () => ({
  app: {
    ['hapi-can']: {
      cache: {},
      repositoryItems: {
        server: [],
        request: []
      },
      pluginOptions: {}
    }
  }
})

const _buildBaseRequest = () => ({
  plugins: {
    ['hapi-can']: {
      cache: {},
      requestTimer: () => ({
        log: () => {},
        elapsed: () => {}
      }),
      h: _buildBaseToolkit()
    }
  }
})

module.exports = {
  _buildBaseServer,
  _buildBaseToolkit,
  _buildBaseRequest
}
