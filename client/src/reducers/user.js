
// User State definition
const userState = {
  id: null,
  imgFileName: null,
  previewImgFileName: null,
  userName: null,
  email: null,
  isFetching: false,
  isReceived: false,
  isNew: true,
  isReviewsReceived: false,
  isCollectionsReceived: false,
  isLoggedIn: false,
  error: null,
  collections: [],
  reviews: [],
  notifType: null,
}

// User action reducer handler
export const user = (state = userState, action) => {
  let resp;

  switch (action.type) {
    case "ERROR_USER_CHECK":
    return Object.assign({}, state, {
      isReceived: true,
      isFetching: false,
      collections: [],
      isLoggedIn: false,
      email: null,
      isNew: false,
      userName: null,
      id: null,
      imgFileName: null,
      error: "Invalid token + id"
    })

    case "ERROR_USER":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        collections: [],
        isLoggedIn: false,
        email: null,
        isNew: false,
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
        isNew: false,
        id: resp.id,
        imgFileName: resp.imgFileName || 'https://boardathome.s3.us-east-2.amazonaws.com/user/test3.jpg',
        previewImgFileName: resp.imgFileName || 'https://boardathome.s3.us-east-2.amazonaws.com/user/test3.jpg',
        userName: resp.username,
        email: resp.email,
      })

    case "RECEIVE_USER_REVIEWS":
      const reviews = action.payload.data.reviews;
      return {
        ...state,
        isReviewsReceived: true,
        reviews
      };

    case "RECEIVE_USER_COLLECTIONS":
      const collections = action.payload.resp.payload.data.collections;
      return {
        ...state,
        isCollectionsReceived: true,
        collections,
      };

    case "ERROR_USER_UPDATE":
      return {
        ...state,
        isFetching: false,
        error: 'An error occurred',
        notifType: "ERROR_USER_UPDATE",
      }

    case "RECEIVE_USER_LOGIN":
      resp = action.payload.data

      // Add token to localStorage
      localStorage.setItem("token", resp.token)
      localStorage.setItem("userID", resp.id)

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isLoggedIn: true,
        error: null,
        isNew: false,
        id: resp.id,
        imgFileName: resp.imgFileName,
        userName: resp.username,
        email: resp.email
      })

    case "RESET_USER_REVIEWS_AND_COLLECTIONS":
      return Object.assign({}, state, {
        isNew: false,
        isReviewsReceived: false,
        isCollectionsReceived: false,
        collections: [],
        reviews: [],
      })

    case "RESET_USER":
      // Remove token if present
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }

      if (localStorage.getItem('userID')) {
        localStorage.removeItem('userID')
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
        isNew: false,
        collections: [],
        reviews: [],
      })

    case "UNSET_NEW":
      return Object.assign({}, state, {
        isNew: false,
      })

    case "RECEIVE_USER_UPDATE":
      const { data } = action.payload;
      return {
        ...state,
        isFetching: false,
        imgFileName: data.imgFileName || state.imgFileName,
        userName: data.username || state.username,
        email: data.email || state.email,
        notifType: "RECEIVE_USER_UPDATE",
      };

    case "RECEIVE_USER_PREVIEW_IMAGE":
      const { url } = action.payload;
      return {
        ...state,
        previewImgFileName: url
      };

    case "RESET_USER_NOTIF":
      return {
        ...state,
        notifType: null,
      }

    default:
      return state
  }
}