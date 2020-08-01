
const gameState = {
  isFetching: false,
  isReceived: false,
  isSet: false,
  error: null,
  data: {},
}


export const game = (state = gameState, action) => {
  switch (action.type) {
    case "ERROR_GAME":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
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
        data: action.payload.data.game,
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

    case "RESET_GAMES":
      return Object.assign({}, state, {
        isSet: false,
        isFetching: false,
        isReceived: false,
        error: null,
        rows: {},
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
