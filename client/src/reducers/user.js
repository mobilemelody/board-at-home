
// User State definition
const userState = {
  id: null,
  imgFileName: null,
  userName: null,
  email: null,
  isFetching: false,
  isReceived: false,
  isLoggedIn: false,
  error: null,
}

// User action reducer handler
export const user = (state = userState, action) => {
  var resp;

  switch (action.type) {
    case "ERROR_USER":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isLoggedIn: false,
        email: null,
        userName: null,
        id: null,
        imgFileName: null,
        error: "Invalid login credentials"
      })

    case "FETCHING_USER":
      return Object.assign({}, state, {
        isFetching: true
      })

    case "RECEIVE_USER":
      resp = action.payload.data
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isLoggedIn: true,
        error: null,
        id: resp.user.id,
        imgFileName: resp.user.imgFileName,
        userName: resp.user.username,
        email: resp.user.email
      })

    case "RECEIVE_USER_LOGIN":
      resp = action.payload.data

      // Add token to localStorage
      localStorage.setItem("token", resp.user.token)
      localStorage.setItem("username", resp.user.username)

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isLoggedIn: true,
        error: null,
        id: resp.user.id,
        imgFileName: resp.user.imgFileName,
        userName: resp.user.username,
        email: resp.user.email
      })

    case "RESET_USER":
      // Remove token if present
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }

      if (localStorage.getItem('username')) {
        localStorage.removeItem('username')
      }

      return Object.assign({}, state, {
        id: null,
        imgFileName: null,
        userName: null,
        email: null,
        isFetching: false,
        isReceived: false,
        isLoggedIn: false,
        error: null,
      })

    default:
      return state
  }
}