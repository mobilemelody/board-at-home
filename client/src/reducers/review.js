
const reviewsState = {
    isFetching: false,
    isReceived: false,
    error: null,
    notifType: null,
    userReviewed: false,
    userReview: {},
    reviews: []
}


export const game = (state = gameState, action) => {
    switch(action.type) {
        case "ERROR_INSERT_REVIEW":
            // console.log(action.payload)
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                notifType: "ERROR_INSERT_REVIEW",
                userReviewed: false,
                userReview: {},
                error: action.payload.data.resp.error,
            })

        case "ERROR_DELETE_REVIEW":
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                error: "ERROR_INSERT_REVIEW",
                userReviewed: true,
                userReview: action.payload.data.resp.userReview
            })

        case "ERROR_DELETE_REVIEW":
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                error: "ERROR_INSERT_REVIEW",
                userReviewed: true,
                userReview: action.payload.data.resp.userReview
            })

        case "ERROR_REVIEWS_RECEIVE":
            return Object.assign({}, state, {


        default: 
            return state
    }
}