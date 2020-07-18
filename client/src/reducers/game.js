
const gameState = {
    isFetching: false,
    isReceived: false,
    error: null,
    data: {},
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
        return Object.assign({}, state, {
            isFetching: false,
            isReceived: false,
            error: null,
            data: {},
            reviews: []
        })
        
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
            }
        })
    }
}

const gamesState = {
    isSet: false,
    isFetching: false,
    isReceived: false,
    error: null,
    rows: {},
}

export const games = (state = gamesState, action) => {
    switch(action.type) {
        case "ERROR_GAMES":
        return Object.assign({}, state, {
            isSet: true,
            isReceived: true,
            isFetching: false,
            // error: action.payload.data.err
            error: "Error fetching game"
        })

        case "FETCHING_GAMES":
        return Object.assign({}, state, {
            isFetching: true,
            isSet: true, 
        })

        case "RECEIVE_GAMES":
        
        let resp = action.payload.data

        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            error: null,
            data: action.payload.data.game,
            reviews: action.payload.data.reviews
        })

        case "RESET_GAMES":
        return Object.assign({}, state, {
            isSet: false,
            isFetching: false,
            isReceived: false,
            error: null,
            rows: {},
        })
        
        // default:
        // return state

        default: 
        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            userReviewed: true,
            error: null,
            rows: [{
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
            }, {
                id: 2,
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
            }]
        })
    }
}

