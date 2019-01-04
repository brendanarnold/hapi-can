
// We fake a request using a timeout
const getUser = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      name: 'Stimpy',
      isUserACat: true
    })
  }, 1000)
})

module.exports = {
  getUser
}
