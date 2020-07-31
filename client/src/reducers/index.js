import { user } from "./user"
import { game, games } from "./game"
import { reviews } from "./reviews"
import { combineReducers } from 'redux'

// Combine all reducers to make store
const reducers = combineReducers({
  user, game, games, reviews,
  // review
})

export default reducers