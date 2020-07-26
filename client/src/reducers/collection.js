const collectionState = {
  isFetching: false,
  isReceived: false,
  isSet: false,
  error: null,
  data: {},
};

// all state objects need to be explicitly reset in each case return, else the object won't change. For example you don't want an error message to persist after the error isn't relevant. On a fetch/receive case, make sure to set error and other state objects back to the default unless you want them to persist. 

export const collection = (state = collectionState, action) => {
  switch(action.type) {
    case "ERROR_COLLECTION":

      // I like to put my logs here to figure out what went wrong
      console.log("collection error", action)
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
      console.log("collection receive", action.payload)
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
