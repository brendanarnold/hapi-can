
// We fake a request using a timeout
const getUser = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      name: 'Stimpy',
      isUserACat: true
    })
  }, 1000)
})

const getFavouriteFood = (isUserACat) => new Promise(resolve => {
  setTimeout(() => { resolve(isUserACat ? 'Fiiiiish' : 'Bone!') }, 1000)
})

const getFavouriteToy = (isUserACat) => new Promise(resolve => {
  setTimeout(() => { resolve(isUserACat ? `Ball O' Wool` : 'Stamp Collection') }, 1000)
})

module.exports = {
  getUser,
  getFavouriteFood,
  getFavouriteToy
}
