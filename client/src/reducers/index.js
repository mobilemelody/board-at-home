import { user } from "./user"
import { game } from "./game"
import { combineReducers } from 'redux'

// Combine all reducers to make store
const reducers = combineReducers({
    user, game
    // review
})

export default reducers