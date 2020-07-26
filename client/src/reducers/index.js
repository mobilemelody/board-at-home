import { user } from "./user"
import { game, games } from "./game"
import { reviews } from "./reviews"
import { collection } from "./collection"
import { combineReducers } from 'redux'

// Combine all reducers to make store
const reducers = combineReducers({
    user, game, games, reviews, collection,
    // review
})

export default reducers