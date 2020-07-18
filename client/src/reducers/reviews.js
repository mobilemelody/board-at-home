
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
                notifType: "ERROR_DELETE_REVIEW",
                userReviewed: true,
                userReview: action.payload.data.resp.userReview,
                error: action.payload.data.resp.error
            })

        case "ERROR_UPDATE_REVIEW":
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                notifType: "ERROR_UPDATE_REVIEW",
                userReviewed: true,
                userReview: action.payload.data.resp.userReview,
                error: action.payload.data.resp.error
            })

        case "ERROR_REVIEWS_RECEIVE":
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                notifType: "ERROR_REVIEWS_RECEIVE",
                userReviewed: false,
                error: action.payload.data.resp.error
            })

        case "SUBMIT_REVIEW_FETCHING":
            return Object.assign({}, state, {
                isReceived: false,
                isFetching: true, 
                notifType: null,
            })

        case "RECEIVE_REVIEWS":
            console.log(action.payload)

            let reviews = action.payload.data.payload.reviews
            let userID = action.payload.data.userID
            let userReview= {}
            let userReviewed = false

            // check for user review
            if (reviews.length > 0) {
                for(const i in reviews) {
                    if (userID == reviews[i].userID) {
                        // Add to user review object and remove from reviews array
                        userReview = reviews[i]
                        userReviewed = true
                        reviews.splice(i, 1)
                        break
                    } 
                }
            }

            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                userReviewed: userReviewed,
                userReview: userReview,
                reviews: reviews,
                notifType: null,
                error: null
            })

        case "RECEIVE_REVIEW_DELETE":
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                userReviewed: false,
                userReview: {},
                notifType: null,
                error: null
            })

        case "RECEIVE_REVIEW_INSERT":
            var reviewInserted = action.payload.data.reviewInserted

            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                userReviewed: true,
                userReview: reviewInserted,
                notifType: null,
                error: null
            })

        case "RECEIVE_REVIEW_UPDATE":
            var reviewUpdated = action.payload.data.reviewUpdated

            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                userReviewed: true,
                userReview: reviewUpdated,
                notifType: null,
                error: null
            })

        default: 
            // return state
            return Object.assign({}, state, {
                isReceived: true,
                isFetching: false,
                userReviewed: true,
                notifType: null,
                error: null,
                userReview: {
                    id: 2,
                    userID: 1,
                    gameID: 1,
                    overallRating: 4,
                    comments: "I haven't had this much fun since 2/25/2007.",
                    strategy: 3,
                    luck: 2,
                    playerInteraction: 5,
                    replayValue: 5,
                    complexity: 0,
                    artAndStyle: 4,
                    gfAdults: true,
                    gfKids: false,
                    gfTeens: false,
                    gfFamilies: true,
                    gf2Player: true,
                    gfLargeGroups: true,
                    gfSocialDistancing: false
                },
                rows: [
                {
                    id: 1,
                    userID: 4,
                    userName: "BoardFlipper",
                    userImg: "https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg",
                    gameID: 1,
                    overallRating: 4,
                    comments: "I flipped the board after 30 minutes playing with my kids.",
                    strategy: 4,
                    luck: 3,
                    playerInteraction: 2,
                    replayValue: 1,
                    complexity: 0,
                    gfAdults: true,
                    gfKids: false,
                    gfTeens: true,
                    gfFamilies: false,
                    gf2Player: true,
                    gfLargeGroups: false,
                    gfSocialDistancing: true
                }, {
                    id: 2,
                    userID: 2,
                    userName: "IGInfluencer",
                    userImg: "https://lh3.googleusercontent.com/proxy/Vb0MEH0zcaw3QE3ESNy8lCbNeYd_DrKdU6NtZuKgi0IUpa9DK0radkNxKSL0Nm_QNy9fyW06mxNc3nb0ZALhiNbmBvXdJo4z9dPjVy36fJdqn774Ec4zSB4l22kt",
                    gameID: 1,
                    overallRating: 4,
                    comments: "DO NOT BUY THIS GAME. I reached out to the publisher asking for a free game in exchange for exposure on my Instagram page. They had the audacity to tell me NO! I'm boycotting spending my hard earned exposure on this publisher!",
                    strategy: 5,
                    luck: 2,
                    playerInteraction: 5,
                    replayValue: 5,
                    complexity: 0,
                    gfKids: false,
                    gfTeens: false,
                    gfFamilies: false,
                    gf2Player: true,
                    gfLargeGroups: true,
                    gfSocialDistancing: false
                }
            ]

            })
    }
}