
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
  collections: [],
  reviews: [],
}

// User action reducer handler
export const user = (state = userState, action) => {
  let resp;

  switch (action.type) {
    case "ERROR_USER":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        collections: [],
        isLoggedIn: false,
        email: null,
        username: null,
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
      console.log(resp);
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isLoggedIn: true,
        error: null,
        id: resp.id,
        imgFileName: resp.imgFileName,
        userName: resp.username,
        email: resp.email,
      })

    case "RECEIVE_USER_REVIEWS":
        const reviews = action.payload.reviews;
        return { ...state, reviews };

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
        id: resp.id,
        imgFileName: resp.imgFileName,
        userName: resp.username,
        email: resp.email
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