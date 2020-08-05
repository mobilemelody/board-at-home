import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, checkLoggedIn, getUserReviews, getUserCollections } from '../actions/index';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../css/UserProfile.css';
import { Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

class _UserProfile extends React.Component {

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

    // if user state is not fetching, not received, and not new
    // at this point, there is no token & id in localStorage, so route should redirect to login
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
          <Grid item md={4} xs={4}>
            <Typography variant='h5'>{user.userName}</Typography>
            <Paper className='profileImgWrapper'>
              <img alt='profile img' src={user.imgFileName}/>
            </Paper>
            <div className="email">Email: {user.email}</div>
            <div className="num-collections">Number of collections: {user.collections.length} </div>
          </Grid>
          <Grid item md={8} xs={8}>
            <span className="heading">Reviews</span>
            <hr/>
            {
              user.reviews.map((review, idx) => (
                <div key={review.id} className={`review ${idx % 2 > 0 && 'review-odd'}`}>
                  <div>
                    <span className="review__name">{review.name}</span>
                    <div className="review__overall-rating">User score: {review.overallRating}</div>
                  </div>
                  <div className="review__comments">{review.comments}</div>
                </div>
              ))
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export const UserProfile = connect(state => {
  const { user } = state;
  return { user };
}, dispatch => {
  return bindActionCreators({
    getUser, getUserReviews, getUserCollections, checkLoggedIn
  }, dispatch)
})(_UserProfile);