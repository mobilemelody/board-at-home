const collectionState = {
  isFetching: false,
  isReceived: false,
  isSet: false,
  error: null,
  data: {},
};

export const collection = (state = collectionState, action) => {
  switch(action.type) {
    case "ERROR_COLLECTION":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error fetching collection"
      });

    case "ERROR_ADD_COLLECTION":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error adding collection"
      });

    case "ERROR_UPDATE_COLLECTION":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error updating collection"
      });

    case "ERROR_ADD_GAME":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error adding game"
      });

    case "ERROR_REMOVE_GAME":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error removing game"
      });

    case "RECEIVE_COLLECTION":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        data: action.payload.resp.payload.data,
      });

    case "RECEIVE_COLLECTION_ADD":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        data: action.payload.resp.payload.data,
      });

    case "RECEIVE_COLLECTION_UPDATE":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "RECEIVE_COLLECTION_UPDATE",
        error: null,
        data: action.payload.resp.data
      });

    case "RECEIVE_GAME_ADD":
      console.log('add game to collection', action.payload.resp.data);
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "RECEIVE_GAME_ADD",
        error: null,
        data: action.payload.resp.data
      });

    case "RECEIVE_GAME_REMOVE":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        notifType: "RECEIVE_GAME_REMOVE",
        error: null,
        data: action.payload.resp.data
      });

    case "SET_COLLECTION_STATE":
      return Object.assign({}, state, {
          isReceived: true,
          isFetching: false,
          isSet: true,
          error: null,
          data: action.payload,
      });
    
    default:
      return state;
  }
}

const collectionsState = {
  isSet: false,
  isFetching: false,
  isReceived: false,
  error: null,
  data: {},
}

export const collections = (state = collectionsState, action) => {
  switch(action.type) {
    case "ERROR_USER_COLLECTIONS":
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error fetching collections"
      });

    case "RECEIVE_USER_COLLECTIONS":
      console.log('get collections', action.payload.resp.payload.data);
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: null,
        data: action.payload.resp.payload.data,
      });

    default:
      return state;
  }
}
