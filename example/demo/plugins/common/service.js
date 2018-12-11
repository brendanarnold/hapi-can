

module.exports = {
  readToken: async () => new Promise(resolve => {
    setTimeout(() => { resolve('1234') }, 1000)
  }),
  readPermissions: async (token) => new Promise(resolve => {
    setTimeout(() => { resolve('admin') }, 1000)
  }),
  readUser: async (token) => new Promise(resolve => {
    setTimeout(() => { resolve({ firstName: 'Bill', lastName: 'Shoggins' }) }, 1000)
  }),
  readPosts: async (token) => new Promise(resolve => {
    setTimeout(() => { resolve([{  }]) }, 1000)
  })
}
