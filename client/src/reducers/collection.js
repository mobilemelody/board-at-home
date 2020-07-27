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

    case "ERROR_UPDATE_COLLECTION":
    console.log('error updating', action.payload);
      return Object.assign({}, state, {
        isReceived: true,
        isFetching: false,
        error: "Error updating collection"
      });

    case "RECEIVE_COLLECTION":
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
        data: action.payload.resp.collectionInfo
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
