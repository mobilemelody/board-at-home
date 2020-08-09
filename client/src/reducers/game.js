
const gameState = {
  isFetching: false,
  isReceived: false,
  isAvgRatingReceived: false,
  isAvgRatingFetching: false,
  isSet: false,
  error: null,
  avgRating: null,
  data: {},
}


export const game = (state = gameState, action) => {
  switch (action.type) {
    case "ERROR_GAME":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isAvgRatingFetching: false,
        isAvgRatingReceived: false, 
        // error: action.payload.data.err
        error: "Error fetching game"
      });

    case "FETCHING_GAME":
      return Object.assign({}, state, {
        isFetching: true,
        isSet: true
      })

    case "RECEIVE_GAME":

      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        data: action.payload.data,
      })

    case "FETCH_GAME_AVG_RATING":
      return Object.assign({}, state, {
        isAvgRatingFetching: true
      })

    case "RECEIVE_GAME_AVG_RATING":
      return Object.assign({}, state, {
        isAvgRatingReceived: true, 
        isAvgRatingFetching: false,
        avgRating: action.payload.data.avgRating
      })


    case "SET_GAME_STATE":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        isSet: true,
        error: null,
        data: action.payload,
      })

    case "RESET_GAME":
      return Object.assign({}, state, {
        isFetching: false,
        isReceived: false,
        isAvgRatingReceived: false,
        avgRating: null,
        isSet: false,
        error: null,
        data: {},
      })

    default:
      return state
  }
}

const gamesState = {
  isSet: false,
  isFetching: false,
  isReceived: false,
  isAvgRatingsReceived: false,
  isAvgRatingsFetching: false,
  avgRatings: null,
  error: null,
  rows: [],
}

export const games = (state = gamesState, action) => {
  switch (action.type) {
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
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        rows: action.payload.data,
      })

    case "RECEIVE_GAMES_AVG_RATING":

      var ratings = new Map() 

      action.payload.data.forEach((row) => {
        ratings[row.gameID] = row.avgRating
      })

      return Object.assign({}, state, {
        isAvgRatingsReceived: true,
        avgRatings: ratings
      })


    case "RESET_GAMES":
      return Object.assign({}, state, {
        isSet: false,
        isFetching: false,
        isReceived: false,
        isAvgRatingsReceived: false,
        isAvgRatingsFetching: false,
        error: null,
        rows: {},
        avgRatings: null,
      })

    default:
      return state
  }
}

const recommendationsState = {
  isSet: false,
  isFetching: false,
  isReceived: false,
  error: null,
  rows: [],
}

export const recommendations = (state = recommendationsState, action) => {
  switch (action.type) {
    case "ERROR_RECOMMENDATIONS":
      return Object.assign({}, state, {
        isSet: true,
        isReceived: true,
        isFetching: false,
        error: "Error fetching recommendations"
      });

    case "FETCHING_RECOMMENDATIONS":
      return Object.assign({}, state, {
        isFetching: true,
        isSet: true,
      });

    case "RECEIVE_RECOMMENDATIONS":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        rows: action.payload.data,
      });

    case "RESET_RECOMMENDATIONS":
      return Object.assign({}, state, {
        isSet: false,
        isFetching: false,
        isReceived: false,
        error: null,
        rows: {},
      });

    default:
      return state;
  }
}
