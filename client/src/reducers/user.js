
// User State definition
const userState = {
  id: null,
  imgFileName: null,
  userName: null,
  isFetching: false,
  isReceived: false,
  isLoggedIn: false,
  error: null,
  collections: [],
}

// User action reducer handler
export const user = (state = userState, action) => {
  switch (action.type) {

    case "ERROR_USER":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        collections: [],
        error: "Invalid login credentials"
      })

    case "FETCHING_USER":
      return Object.assign({}, state, {
        isFetching: true
      })

    case "RECEIVE_USER":
      const { token, id, imgFileName, username, collections } = action.payload;

      // Add token to localStorage
      localStorage.setItem("token", token)

      return Object.assign({}, state, {
        id,
        imgFileName,
        username,
        isReceived: true,
        isLoggedIn: true,
        collections: collections,
      })

    case "RESET_USER":
      // Remove token if present
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }

      return Object.assign({}, state, {})

    default:
      // return state
      return Object.assign({}, state, {
        isFetching: false,
        isReceived: true,
        isLoggedIn: true,
      })
  }
}