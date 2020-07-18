import { user } from "./user"
import { game } from "./game"
import { reviews } from "./reviews"
import { combineReducers } from 'redux'

// Combine all reducers to make store
const reducers = combineReducers({
    user, game, reviews,
    // review
})

export default reducers