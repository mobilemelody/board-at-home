
const gameState = {
    isFetching: false,
    isReceived: false,
    error: null,
    data: {},
    userReviewed: false,
    userReview: {},
    reviews: []
}

export const game = (state = gameState, action) => {
    switch(action.type) {
        case "ERROR_GAME":
        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            // error: action.payload.data.err
            error: "Error fetching game"
        })

        case "FETCHING_GAME":
        return Object.assign({}, state, {
            isFetching: true
        })

        case "RECEIVE_GAME":
        
        let resp = action.payload.data

        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            error: null,
            data: action.payload.data.game,
            reviews: action.payload.data.reviews
        })

        case "RESET_GAME":
        return Object.assign({}, state, {})
        
        // default:
        // return state

        default: 
        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            userReviewed: true,
            error: null,
            data: {
                id: 1,
                isUserCreated: false,
                identifierID: "12312",
                name: "Spirit Island",
                publisher: "Greater Than Games",
                year: 2016,
                minAge: 13,
                minPlaytime: 90,
                maxPlaytime: 120,
                minPlayers: 1, 
                maxPlayers: 4,
                imgFileName: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254941010-61PJxjjnbfL.jpg",
                description: "Powerful Spirits have existed on this isolated island for time immemorial. They are both part of the natural world and - at the same time - something beyond nature. Native Islanders, known as the Dahan, have learned how to co-exist with the spirits, but with a healthy dose of fear and reverence. However, now, the island has been \"discovered\" by invaders from a far-off land. These would-be colonists are taking over the land and upsetting the natural balance, destroying the presence of Spirits as they go. As Spirits, you must grow in power and work together to drive the invaders from your island... before it's too late!"
            },
            userReviewed: true,
            userReview: {
                id: 1,
                userID: 1,
                gameID: 1,
                overallRating: 3.5,
                comments: "I flipped the board after 30 minutes playing with my kids.",
                strategy: 4.5,
                luck: 3.2,
                playerInteraction: 2.1,
                replayValue: 1.2,
                complexity: 5.0,
                gfKids: false,
                gfTeens: true,
                gfFamilies: true,
                gf2Player: true,
                gfLargeGroups: false,
                gfSocialDistancing: false
            },
            reviews: [
                {
                    id: 1,
                    userID: 1,
                    gameID: 1,
                    overallRating: 3.5,
                    comments: "I flipped the board after 30 minutes playing with my kids.",
                    strategy: 4.5,
                    luck: 3.2,
                    playerInteraction: 2.1,
                    replayValue: 1.2,
                    complexity: 5.0,
                    gfKids: false,
                    gfTeens: true,
                    gfFamilies: false,
                    gf2Player: true,
                    gfLargeGroups: false,
                    gfSocialDistancing: false
                }, {
                    id: 2,
                    userID: 2,
                    gameID: 1,
                    overallRating: 4.9,
                    comments: "I haven't had this much fun since 2/25/2007.",
                    strategy: 3.5,
                    luck: 1.2,
                    playerInteraction: 5.0,
                    replayValue: 5.0,
                    complexity: 0.5,
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


