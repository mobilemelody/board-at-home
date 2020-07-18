// React Redux Imports and Axios
import { createAction } from 'redux-actions'
import api from "../lib/api"

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://boardathome.herokuapp.com';

// Create actions for User state
const errorUser = createAction("ERROR_USER")
const fetchingUser = createAction("FETCHING_USER")
const receiveUser = createAction("RECEIVE_USER")
const resetUser = createAction("RESET_USER")

export const userLoading = () => {
    return dispatch => {
        dispatch(fetchingUser())
    }
}

export const userLogin = (username, password) => {
    // dispatch triggers a state change
    return dispatch => {
        let data = {username, password}

        return api.post("/user/login", data)
        .then(resp => dispatch(receiveUser(resp)))
        .catch(err => dispatch(errorUser(err)))
    }
}

export const userLogout = () => {
    return dispatch => {
        dispatch(resetUser())
    }
}

// Create actions for Game state
const errorGames = createAction("ERROR_GAMES")
const fetchingGames = createAction("FETCHING_GAMES")
const receiveGames = createAction("RECEIVE_GAMES")

const setGameState = createAction("SET_GAME_STATE")

export const getGames = () => {
    return (dispatch, getState) => {

        const { user } = getState()
        // add user id to parameters

        return api.get(`${baseURL}/games/all`)
        .then(resp => dispatch(receiveGames(resp)))
        .catch(err => dispatch(errorGames()))
    }
}

export const getSetGameState = (game) => {
    return (dispatch) => {
        return dispatch(setGameState(game))
    }
}

// Create actions for Review state
const errorInsertReview = createAction("ERROR_INSERT_REVIEW")
const errorDeleteReview = createAction("ERROR_DELETE_REVIEW")
const errorReceiveReviews = createAction("ERROR_REVIEWS_RECEIVE")
const errorUpdateReviews = createAction("ERROR_UPDATE_REVIEW")

const submitReviewFetching = createAction("SUBMIT_REVIEW_FETCHING")
const receiveReviews = createAction("RECEIVE_REVIEWS")
const receiveReviewsDeleted = createAction("RECEIVE_REVIEW_DELETE")
const receiveReviewInserted = createAction("RECEIVE_REVIEW_INSERT")
const receiveReviewUpdated = createAction("RECEIVE_REVIEW_UPDATE")


export const submitReviewFetch = () => {
    return (dispatch) => {
        dispatch(submitReviewFetching())
    }
}

// Insert new review
export const submitReview = (data) => {
    return (dispatch, getState) => {
        const {user} = getState() 
        data.userID = user.userID

        return api.post('/reviews', data)
        .then(res => {
            dispatch(receiveReviewInserted({resp: {
                payload: res,
                userID: user.userID,
                reviewInserted: data, 
            }}))
        })
        .catch(err => {
            dispatch(errorInsertReview({resp: {
                error: err
            }}))
        })
    }
}

// update existing review
export const updateReview = (data) => {
    return (dispatch, getState) => {
        const {user} = getState() 
        data.userID = user.userID

        return api.post('/reviews', data)
        .then(res => {
            dispatch(receiveReviewUpdated({resp: {
                payload: res,
                userID: user.userID,
                reviewUpdated: data, 
            }}))
        })
        .catch(err => {
            dispatch(errorUpdateReviews({resp: {
                error: err,
                userReview: data,
            }}))
        })
    }
}

// delete review
export const deleteReview = (data) => {
    return (dispatch, getState) => {
        const {user} = getState() 
        data.userID = user.userID

        return api.post('/delete', data)
        .then(res => {
            dispatch(receiveReviewsDeleted({resp: {
                payload: res,
                userID: user.userID
            }}))
        })
        .catch(err => {
            dispatch(errorDeleteReview({resp: {
                error: err,
                userReview: data,
            }}))
        })
    }
}

// get reviews for game
export const getReviews = () => {
    return (dispatch, getState) => {
        const {user} = getState() 
        const { game } = getState()
        return api.post('/reviews')
        .then(res => {
            dispatch(receiveReviews({resp: {
                payload: res,
                userID: user.userID
            }}))
        })
        .catch(err => {
            dispatch(errorReceiveReviews(err))
        })
    }
}



