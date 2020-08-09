
const reviewsState = {
  isFetching: false,
  isReceived: false,
  error: null,
  notifType: null,
  userReviewed: false,
  userReview: {},
  rows: []
}


export const reviews = (state = reviewsState, action) => {
  switch (action.type) {
    case "ERROR_INSERT_REVIEW":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "ERROR_INSERT_REVIEW",
        userReviewed: false,
        userReview: action.payload.resp.userReview,
        error: action.payload.resp.error,
      })

    case "ERROR_DELETE_REVIEW":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "ERROR_DELETE_REVIEW",
        userReviewed: true,
        userReview: action.payload.resp.userReview,
        error: action.payload.resp.error
      })

    case "ERROR_UPDATE_REVIEW":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "ERROR_UPDATE_REVIEW",
        userReviewed: true,
        userReview: action.payload.resp.userReview,
        error: action.payload.resp.error
      })

    case "ERROR_REVIEWS_RECEIVE":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "ERROR_REVIEWS_RECEIVE",
        userReviewed: false,
        error: action.payload.data
      })

    case "SUBMIT_REVIEW_FETCHING":
      return Object.assign({}, state, {
        isReceived: false,
        isFetching: true,
        notifType: null,
      })

    case "RECEIVE_REVIEWS":
      let reviews = action.payload.resp.payload.data.results;
      let userID = action.payload.resp.userID;
      let userReview = {};
      let userReviewed = false;

      // check for user review
      if (reviews.length > 0) {
        for (const i in reviews) {
          if (userID === reviews[i].user.id) {
            // Add to user review object and remove from reviews array
            userReview = reviews[i];
            userReviewed = true;
            reviews.splice(i, 1);
            break;
          }
        }
      }

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        userReviewed: userReviewed,
        userReview: userReview,
        rows: reviews,
        notifType: null,
        error: null
      })

    case "RECEIVE_REVIEW_DELETE":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        userReviewed: false,
        userReview: {},
        notifType: "RECEIVE_REVIEW_DELETE",
        error: null
      })

    case "RECEIVE_REVIEW_INSERT":
      var reviewInserted = action.payload.resp.payload.data;

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        userReviewed: true,
        userReview: reviewInserted,
        notifType: "RECEIVE_REVIEW_INSERT",
        error: null
      })

    case "RECEIVE_REVIEW_UPDATE":
      var updatedReview = action.payload.resp.payload.data;

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        userReviewed: true,
        userReview: updatedReview,
        notifType: "RECEIVE_REVIEW_UPDATE",
        error: null
      })

    case "RESET_REVIEW":
      return Object.assign({}, state, {
        isFetching: false,
        isReceived: false,
        error: null,
        notifType: null,
        userReviewed: false,
        userReview: {},
        rows: []
      })

    case "RESET_NOTIF":
      return Object.assign({}, state, {
        notifType: null
      });

    default:
      return state
  }
}