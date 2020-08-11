// React Redux Imports and Axios
import { createAction } from 'redux-actions'
import api from "../lib/api"

// Create actions for User state
const errorUser = createAction("ERROR_USER")
const fetchingUser = createAction("FETCHING_USER")
const receiveUser = createAction("RECEIVE_USER")
const receiveUserLogin = createAction("RECEIVE_USER_LOGIN")
const receiveUserSignedUp = createAction("RECEIVE_USER_SIGNEDUP")
const resetUser = createAction("RESET_USER")
const receiveUserReviews = createAction("RECEIVE_USER_REVIEWS");
const errorUserReviews = createAction("ERROR_USER_REVIEWS");
const errorUserCheck = createAction("ERROR_USER_CHECK");
const unsetUserIsNew = createAction("UNSET_NEW");
const receiveUserUpdate = createAction("RECEIVE_USER_UPDATE");
const errorUserUpdate = createAction("ERROR_USER_UPDATE");
const receiveUserPreviewImage = createAction("RECEIVE_USER_PREVIEW_IMAGE");
const errorUserPreviewImage = createAction("ERROR_USER_PREVIEW_IMAGE");
const resetUserNotif = createAction("RESET_USER_NOTIF");

export const userLoading = () => {
  return dispatch => dispatch(fetchingUser());
}

export const userSignUp = (user) => {
  return (dispatch) => {
    return api.post("/users/signup", user)
      .then(resp => dispatch(receiveUserSignedUp(resp)))
      .catch(err => dispatch(errorUser(err)))
  }
}

export const checkLoggedIn = () => {
  return (dispatch) => {
    return api.get("/users/check")
      .then(resp => dispatch(receiveUser(resp)))
      .catch(err => dispatch(errorUserCheck(err)))
  }
}

export const userLogin = (username, password) => {
  // dispatch triggers a state change
  return (dispatch) => {
    let data = { username, password }
    return api.post("/users/login", data)
      .then(resp => dispatch(receiveUserLogin(resp)))
      .catch(err => dispatch(errorUser(err)))
  }
}

export const userUnsetIsNew = () => {
  return dispatch => dispatch(unsetUserIsNew());
}

export const userLogout = () => {
  return dispatch => dispatch(resetUser());
}

export const getUser = () => {
  return (dispatch, getState) => {
    const { user } = getState()
    return api.get(`/users/${user.id}/reviews`)
      .then(res => dispatch(receiveUserReviews(res)))
      .catch(err => dispatch(errorUserReviews(err)))
      .then(() => api.get(`/users/${user.id}/collections`))
      .then(res => {
        dispatch(receiveUserCollections({
          resp: {
            payload: res,
            userID: user.id
          }
        }));
      })
      .catch(err => dispatch(errorUserCollections(err)));
  }
}

export const getUserReviews = () => {
  return (dispatch, getState) => {
    const { user } = getState();
    return api.get(`/users/${user.id}/reviews`)
      .then(resp => dispatch(receiveUserReviews(resp.data)))
      .catch(err => dispatch(errorUserReviews(err)))
  }
};

export const updateUser = (data) => {
  return (dispatch, getState) => {
    const { user } = getState();
    return api.put(`/users/${user.id}`, data)
    .then(res => dispatch(receiveUserUpdate(res)))
    .catch(err => dispatch(errorUserUpdate(err)));
  }
}

export const userReset = () => {
  return dispatch => {
    dispatch(resetUser())
  }
}

export const getResetUserNotif = () => {
  return (dispatch) => {
    dispatch(resetUserNotif());
  }
}

export const uploadPreviewImage = (evt) => {
  return (dispatch) => {
    const imageData = evt.target.files[0];
    const { name, type } = imageData;
    return api.post(`/users/image-s3`, { fileName: name, fileType: type })
    .then(res => {
      // Not a typo. There's a data key within data
      const { signedRequest, url } = res.data.data.returnData;
      // We use fetch here because the currently API util will add
      // headers the AWS S3 doesn't like
      // TODO: Refactor so that we have a separate API client for external APIs
      fetch(signedRequest, {
        method: 'PUT',
        body: imageData,
        headers: {
          'Content-Type': type
        },
      })
      .then(() => dispatch(receiveUserPreviewImage({ url })))
      .catch(err => dispatch(errorUserPreviewImage(err)));
    })
  }
}

export const updateProfileWithImage = (data) => {
  return (dispatch, getState) => {
    const { user } = getState();
    return api.put(`/users/${user.id}`, data)
    .then(res => dispatch(receiveUserUpdate(res)))
    .catch(err => dispatch(errorUserUpdate(err)));
  }
}

const resetUserReviewsAndCollections = createAction("RESET_USER_REVIEWS_AND_COLLECTIONS")

export const userResetReviewsAndCollections = () => {
  return dispatch => {
    dispatch(resetUserReviewsAndCollections())
  }
}

// Create actions for Games state
const errorGames = createAction("ERROR_GAMES")
const fetchingGames = createAction("FETCHING_GAMES")
const receiveGames = createAction("RECEIVE_GAMES")
const setGameState = createAction("SET_GAME_STATE")

export const gamesLoading = () => {
  return dispatch => {
    dispatch(fetchingGames())
  }
}

export const getGames = () => {
  return (dispatch) => {
    return api.get('/games/')
      .then(resp => dispatch(receiveGames(resp)))
      .catch(err => dispatch(errorGames(err)))
  }
}


const receiveGamesAvgRating = createAction("RECEIVE_GAMES_AVG_RATING")

export const getGamesAvgRating = (game_id) => {
  return (dispatch) => {
    return api.get(`/games/reviews/average`)
      .then(resp => dispatch(receiveGamesAvgRating(resp)))
      .catch(err => dispatch(errorGames(err)))
  }
}

// Game actions
const errorGame = createAction("ERROR_GAME")
const fetchingGame = createAction("FETCHING_GAME")
const receiveGame = createAction("RECEIVE_GAME")
const resetGameState = createAction("RESET_GAME")

export const gameLoading = () => {
  return dispatch => {
    dispatch(fetchingGame())
  }
}

export const resetGame = () => {
  return dispatch => {
    dispatch(resetGameState())
  }
}

export const getGame = (gameID) => {
  return (dispatch) => {
    return api.get(`/games/${gameID}`)
      .then(resp => dispatch(receiveGame(resp)))
      .catch(err => dispatch(errorGame(err)))
  }
}

const fetchingGameAvgRating = createAction("FETCH_GAME_AVG_RATING")
const receiveGameAvgRating = createAction("RECEIVE_GAME_AVG_RATING")

export const getGameAvgRating = (game_id) => {
  return (dispatch) => {
    return api.get(`/games/${game_id}/reviews/average`)
      .then(resp => dispatch(receiveGameAvgRating(resp)))
      .catch(err => dispatch(errorGame(err)))
  }
}

export const fetchGameAvgRating = () => {
  return dispatch => {
    dispatch(fetchingGameAvgRating())
  }
}

export const getSetGameState = (game) => {
  return (dispatch) => {
    return dispatch(setGameState(game))
  }
}

// Create actions for Recommendations state
const errorRecommendations = createAction("ERROR_RECOMMENDATIONS")
const fetchingRecommendations = createAction("FETCHING_RECOMMENDATIONS")
const receiveRecommendations = createAction("RECEIVE_RECOMMENDATIONS")

export const recommendationsLoading = () => {
  return dispatch => {
    dispatch(fetchingRecommendations())
  }
}

export const getRecommendations = () => {
  return (dispatch) => {
    return api.get('/games/recommendations')
      .then(resp => dispatch(receiveRecommendations(resp)))
      .catch(err => dispatch(errorRecommendations(err)))
  }
}

// Create actions for Review state
const errorInsertReview = createAction("ERROR_INSERT_REVIEW");
const errorDeleteReview = createAction("ERROR_DELETE_REVIEW");
const errorReceiveReviews = createAction("ERROR_REVIEWS_RECEIVE");
const errorUpdateReviews = createAction("ERROR_UPDATE_REVIEW");

const submitReviewFetching = createAction("SUBMIT_REVIEW_FETCHING");
const receiveReviews = createAction("RECEIVE_REVIEWS");
const receiveReviewsDeleted = createAction("RECEIVE_REVIEW_DELETE");
const receiveReviewInserted = createAction("RECEIVE_REVIEW_INSERT");
const receiveReviewUpdated = createAction("RECEIVE_REVIEW_UPDATE");
const resetReviewNotif = createAction("RESET_NOTIF");

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

const resetReviewState = createAction("RESET_REVIEW")

export const resetReview = () => {
  return (dispatch) => {
    dispatch(resetReviewState())
  }
}

// Create actions for Collection state
const errorCollection = createAction("ERROR_COLLECTION");
const errorAddCollection = createAction("ERROR_ADD_COLLECTION");
const errorUpdateCollection = createAction("ERROR_UPDATE_COLLECTION");
const errorAddGame = createAction("ERROR_ADD_GAME");
const errorRemoveGame = createAction("ERROR_REMOVE_GAME");
const errorUserCollections = createAction("ERROR_USER_COLLECTIONS");

const receiveCollection = createAction("RECEIVE_COLLECTION");
const receiveCollectionAdded = createAction("RECEIVE_COLLECTION_ADD");
const receiveCollectionUpdated = createAction("RECEIVE_COLLECTION_UPDATE");
const receiveGameAdded = createAction("RECEIVE_GAME_ADD");
const receiveGameRemoved = createAction("RECEIVE_GAME_REMOVE");

// const fetchingUserCollections = createAction("FETCH_USER_COLLECTIONS");
const receiveUserCollections = createAction("RECEIVE_USER_COLLECTIONS");

const setCollectionState = createAction("SET_COLLECTION_STATE");
const resetCollectionState = createAction("RESET_COLLECTION_STATE");

export const resetCollection = () => {
  return (dispatch) => {
    return dispatch(resetCollectionState())
  }
}

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

// Create a new collection
export const createCollection = (collection) => {
  return (dispatch, getState) => {
    // TODO: Add user info to request
    // const { user } = getState();

    return api.post(`/collections`, collection)
      .then(res => {
        dispatch(receiveCollectionAdded({
          resp: {
            payload: res,
            collection: collection,
          }
        }))
      })
      .catch(err => {
        dispatch(errorAddCollection({
          resp: {
            error: err,
            collection: collection,
          }
        }))
      });
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
            data: data,
          }
        }));
      })
      .catch(err => {
        dispatch(errorUpdateCollection({
          resp: {
            error: err,
            data: data,
          }
        }));
      });
  }
}

// get user collections
export const getUserCollections = () => {
  return (dispatch, getState) => {
    const { user } = getState();
    return api.get(`/users/${user.id}/collections`)
      .then(res => {
        dispatch(receiveUserCollections({
          resp: {
            payload: res,
            userID: user.id
          }
        }));
      })
      .catch(err => dispatch(errorUserCollections(err)));
  }
}

// add game to collection
export const addGameToCollection = (collection, gameID) => {
  return (dispatch, getState) => {
    const { game } = getState();
    if (!gameID) {
      gameID = game.data.id;
    }
    return api.put(`/collections/${collection.id}/games/${gameID}`)
      .then(res => {
        dispatch(receiveGameAdded({
          resp: {
            payload: res,
            data: collection,
          }
        }));
      })
      .catch(err => {
        dispatch(errorAddGame({
          resp: {
            error: err,
            data: collection,
          }
        }));
      });
  }
}

// remove game from collection
export const removeGameFromCollection = (collection, gameID) => {
  return (dispatch, getState) => {
    const { game } = getState();
    if (!gameID) {
      gameID = game.data.id;
    }
    return api.delete(`/collections/${collection.id}/games/${gameID}`)
      .then(res => {
        dispatch(receiveGameRemoved({
          resp: {
            payload: res,
            data: collection,
          }
        }));
      })
      .catch(err => {
        dispatch(errorRemoveGame({
          resp: {
            error: err,
            data: collection,
          }
        }));
      });
  }
}
