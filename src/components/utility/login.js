const horizon = Horizon()
horizon.connect()

let currentUserName = '';

// horizon.currentUser().watch().subscribe(user => {
//   currentUserName = user.name || currentUserName
// })

const hasUserName = () => {
  return !!currentUserName.length
}

const getUserName = () => {
  return currentUserName
}

const isAuthenticated = () => {
  return horizon.hasAuthToken()
}

export {
  hasUserName,
  getUserName,
  isAuthenticated
}

// TODO: Create a callback system for listeners that are performed on updates of user
