// React Redux Imports and Axios
import { createAction } from 'redux-actions';
import api from "../lib/api";

// Create actions for User state
const errorUser = createAction("ERROR_USER");
const fetchingUser = createAction("FETCHING_USER");
const receiveUser = createAction("RECEIVE_USER");
const resetUser = createAction("RESET_USER");

export const userLoading = () => {
  return dispatch => dispatch(fetchingUser());
}

export const userLogin = (username, password) => {
  // dispatch triggers a state change
  return dispatch => {
    let data = { username, password };

    return api.post("/user/login", data)
      .then(resp => dispatch(receiveUser(resp)))
      .catch(err => dispatch(errorUser(err)));
  }
}

export const userLogout = () => {
  return dispatch => dispatch(resetUser());
}

// Create actions for Game state
const errorGames = createAction("ERROR_GAMES")
// const fetchingGames = createAction("FETCHING_GAMES")
const receiveGames = createAction("RECEIVE_GAMES")

const setGameState = createAction("SET_GAME_STATE")

export const getGames = () => {
  return (dispatch) => {
    return api.get('/games/')
      .then(resp => dispatch(receiveGames(resp)))
      .catch(err => dispatch(errorGames(err)))
  }
}

export const getSetGameState = (game) => {
  return (dispatch) => {
    return dispatch(setGameState(game))
  }
}

// Create actions for Review state
const errorInsertReview = createAction("ERROR_INSERT_REVIEW")
const errorDeleteReview = createAction("ERROR_DELETE_REVIEW")
const errorReceiveReviews = createAction("ERROR_REVIEWS_RECEIVE")
const errorUpdateReviews = createAction("ERROR_UPDATE_REVIEW")

const submitReviewFetching = createAction("SUBMIT_REVIEW_FETCHING")
const receiveReviews = createAction("RECEIVE_REVIEWS")
const receiveReviewsDeleted = createAction("RECEIVE_REVIEW_DELETE")
const receiveReviewInserted = createAction("RECEIVE_REVIEW_INSERT")
const receiveReviewUpdated = createAction("RECEIVE_REVIEW_UPDATE")
const resetReviewNotif = createAction("RESET_NOTIF")

export const getResetReviewNotif = () => {
  return (dispatch) => {
    dispatch(resetReviewNotif())
  }
}



export const submitReviewFetch = () => {
  return (dispatch) => {
    dispatch(submitReviewFetching())
  }
}

// Insert new review
export const submitReview = (review) => {
  return (dispatch, getState) => {
    const { user } = getState();
    const { game } = getState();

    review.userID = user.id;
    review.game_id = game.data.id;

    return api.post(`/games/${game.data.id}/reviews`, review)
      .then(res => {
        dispatch(receiveReviewInserted({
          resp: {
            payload: res,
            userID: user.id,
            reviewInserted: review,
          }
        }))
      })
      .catch(err => {
        dispatch(errorInsertReview({
          resp: {
            error: err,
            userID: user.id,
            reviewInserted: review,
          }
        }))
      });
  }
}

// update existing review
export const updateReview = (data) => {
  return (dispatch, getState) => {
    const { user } = getState();
    return api.patch(`/reviews/${data.id}`, data)
      .then(res => {
        dispatch(receiveReviewUpdated({
          resp: {
            payload: res,
            userID: user.id,
            userReview: data,
          }
        }));
      })
      .catch(err => {
        dispatch(errorUpdateReviews({
          resp: {
            error: err,
            userReview: data,
          }
        }));
      });
  }
}

// delete review
export const deleteReview = (data) => {
  return (dispatch, getState) => {
    const { user } = getState();
    data.userID = user.userID;

    return api.delete(`/reviews/${data.id}`)
      .then(res => {
        dispatch(receiveReviewsDeleted({
          resp: {
            payload: res,
            userID: user.id
          }
        }));
      })
      .catch(err => {
        dispatch(errorDeleteReview({
          resp: {
            error: err,
            userReview: data,
          }
        }));
      });
  }
}

// get reviews for game
export const getGameReviews = () => {
  return (dispatch, getState) => {
    const { game } = getState();
    const { user } = getState();
    var game_id = game.data.id;
    return api.get(`/games/${game_id}/reviews`)
      .then(res => {
        dispatch(receiveReviews({
          resp: {
            payload: res,
            userID: user.id
          }
        }));
      })
      .catch(err => {
        dispatch(errorReceiveReviews(err))
      });
  }
}

// Create actions for Collection state
const errorCollection = createAction("ERROR_COLLECTION");
const errorUpdateCollection = createAction("ERROR_UPDATE_COLLECTION");

const receiveCollection = createAction("RECEIVE_COLLECTION");
const receiveCollectionUpdated = createAction("RECEIVE_COLLECTION_UPDATE")

const setCollectionState = createAction("SET_COLLECTION_STATE");

export const getCollection = (id) => {
  return (dispatch, getState) => {
    let collection_id = id;
    return api.get(`/collections/${collection_id}`)
      .then(res => {
        dispatch(receiveCollection({
          resp: {
            payload: res
          }
        }));
      })
      .catch(err => dispatch(errorCollection(err)));
  }
}

export const getSetCollectionState = (collection) => {
  return (dispatch) => {
    return dispatch(setCollectionState(collection))
  }
}

// update collection info
export const updateCollection = (data) => {
  return (dispatch, getState) => {
    let collectionData = {
      name: data.name,
      isPrivate: data.isPrivate
    };
    return api.patch(`/collections/${data.id}`, collectionData)
      .then(res => {
        dispatch(receiveCollectionUpdated({
          resp: {
            payload: res,
            collectionInfo: data,
          }
        }));
      })
      .catch(err => {
        dispatch(errorUpdateCollection({
          resp: {
            error: err,
            collectionInfo: data,
          }
        }));
      });
  }
}

