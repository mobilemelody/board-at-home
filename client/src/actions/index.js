// React Redux Imports and Axios
import { createAction } from 'redux-actions'
import api from "../lib/api"

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

export const getGames = () => {
    return dispatch => {
        dispatch(fetchingGames)
        return api.get("/games/all")
        .then(resp => dispatch(receiveGames(resp)))
        .catch(err => dispatch(errorGames()))
    }
}
