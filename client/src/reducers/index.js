import { user } from "./user"
import { game, games, recommendations } from "./game"
import { reviews } from "./reviews"
import { collection, collections } from "./collection"
import { combineReducers } from 'redux'

// Combine all reducers to make store
const reducers = combineReducers({
  user, game, games, reviews, collection, collections, recommendations
  // review
})

export default reducers