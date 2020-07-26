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
        // error: action.payload.data.err
        error: "Error fetching collection"
      });

    case "FETCHING_COLLECTION":
      return Object.assign({}, state, {
          isFetching: true,
          isSet: true
      });

    case "RECEIVE_COLLECTION":
      return Object.assign({}, state, {
          isReceived: true,
          isFetching: false,
          error: null,
          data: action.payload.data.collection,
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
