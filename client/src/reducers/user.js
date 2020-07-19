
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
    switch(action.type) {

        case "ERROR_USER":
        return Object.assign({}, state, {
            isReceived: true,
            isFetching: false,
            collections: [],
            // error: action.payload.data.err
            error: "Invalid login credentials"
        })

        case "FETCHING_USER":
        return Object.assign({}, state, {
            isFetching: true
        })

        case "RECEIVE_USER":
        let resp = action.payload.data

        // Add token to localStorage
        localStorage.setItem("token", resp.token)

        return Object.assign({}, state, {
            isReceived: true,
            isLoggedIn: true,
            collections: resp.collections
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
            id: 1,
            imgFileName: "https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg",
            userName: "testUser",
            isFetching: false,
            isReceived: true,
            isLoggedIn: true,
        })
    }
}