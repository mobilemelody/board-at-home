// React, Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom'
// Action imports
import { getUser, checkLoggedIn, getUserReviews, getUserCollections, userResetReviewsAndCollections } from '../actions/index';
// Other imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { LinkContainer } from 'react-router-bootstrap';
import BoardGameCollection from '../svg/board-game-collection';
import { Spinner } from 'react-bootstrap';
// CSS imports
import '../css/UserProfile.css';

// ------------------------------------
// User Profile Class
// Renders user, user reviews, and link to user collections
// ------------------------------------
class _UserProfile extends React.Component {
  componentDidMount() {
    this.props.userResetReviewsAndCollections()
  }

  allFetched = (user) => {
    return user.isReceived && user.isReviewsReceived;
  }

  render() {
    const { user } = this.props

    // At beginning of user state, check to see if user state action has been dispatched
    if (user.isNew) {
      return (
      <div className="spinner-wrapper">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      </div>
      )
    }

    // if user state is not fetching, not received, and not new redirect to login
    if(!user.isReceived && !user.isFetching && !user.isNew) {
      return <Redirect to='/login' />
    }

    // if user state is valid and logged in, get reviews and collections
    if (user.isReceived && user.isLoggedIn && !user.isReviewsReceived) {
      this.props.getUser();
    }

    return this.allFetched(user) && (
      <div className="UserProfile">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <h1>{user.userName}</h1>
            <Paper className='profileImgWrapper'>
              <img alt='profile img' src={user.imgFileName}/>
            </Paper>
            <div className="email">Email: {user.email}</div>
            <div className="num-collections">Number of collections: {user.collections.length} </div>
            <div className="pt-2">
              { user.reviews.length > 0 &&
                <>
                  <div>Average Rating: </div>
                  <Rating
                    name="userAvgRating"
                    value={
                      user.reviews.map(e => e.overallRating)
                        .reduce((sum, rating) => sum + rating) / user.reviews.length
                    }
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                </>
              }
            </div>
            <div className="button-container">
              <Link to='/profile/edit'>
                <Button
                  variant='contained'
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item md={9} xs={12} className="pt-3">
            <h4>Reviews</h4>
            <hr/>
            {
              user.reviews.map((review, idx) => (
                <div key={review.id} className={`review ${idx % 2 > 0 && 'review-odd'}`}>
                  <div>
                    <span className="review__name">{review.name}</span>
                    <Rating
                      className="review__overall-rating"
                      name="overallRating"
                      value={review.overallRating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <div className="review__comments">{review.comments}</div>
                </div>
              ))
            }
          </Grid>
        </Grid>
        <div className="pt-3">
          <h4>Collections</h4>
          <hr/>
          <Grid container justify="flex-start" className="collections" spacing={1}>
            {
              user.collections.map((collection) => (
                <Grid item md={3} sm={6} xs={12}>
                  <LinkContainer to={`/collections/${collection.id}`}>
                    <div className="collection-container">
                      <BoardGameCollection/>
                      <div className="collection-name">{collection.name}</div>
                      <div className="overlay"></div>
                      <div className="collection-details">
                        <div className="overlay-title">Number of games: {collection.gameCount}</div>
                      </div>
                    </div>
                  </LinkContainer>
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export const UserProfile = connect(state => {
  const { user } = state;
  return { user };
}, dispatch => {
  return bindActionCreators({
    getUser, getUserReviews, getUserCollections, userResetReviewsAndCollections, checkLoggedIn
  }, dispatch)
})(_UserProfile);