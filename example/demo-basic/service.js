
const myService = {
  getUser: async () => new Promise(resolve => {
    setTimeout(() => { resolve('Bill Shoggins') }, 1000)
  }),
  getGreeting: async (user) => new Promise(resolve => {
    setTimeout(() => { resolve(`Hi ${user}`) }, 1000)
  }),
  getQuestion: async (user) => new Promise(resolve => {
    setTimeout(() => { resolve(`I hope you are well ${user}?`) }, 1000)
  })
}

module.exports = myService
